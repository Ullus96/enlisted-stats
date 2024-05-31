<template>
	<div class="calculator__grid">
		<calculator-branch
			v-for="(branch, index) in skillsList"
			:key="branch"
			:skills="skillsList[index]"
			:branchIndex="index"
			:remainingStats="remainingStats ? remainingStats : statsPool"
			:statsPool="statsPool"
			:tags="tags"
			:pointsSpentOnTier1="pointsSpentOnTier1"
			:soldierClass="soldierClass"
			@statChanged="statChanged"
			@notEnoughPoints="notEnoughPoints"
		></calculator-branch>
	</div>

	<!-- if not authorized - tell user that he needs 
		to login to save skill build -->
	<template v-if="!auth">
		<div class="calculator__tell-to-login">
			Вы не авторизованы.
			<a href="/login" @click.prevent="openLoginPopup"
				>Зарегистрируйте или войдите</a
			>
			в учетную запись, чтобы иметь возможность сохранять сборки, а так же
			делиться ими с другими пользователями.
		</div>
	</template>
	<!-- Default behaviour if opened by Table or Calculator -->
	<template v-if="!isOpenedBySkillBuild">
		<div class="calculator__save-btn">
			<button
				class="btn btn-main"
				@click="showSaveModal = true"
				:disabled="!auth"
				id="saveBuild"
			>
				Сохранить сборку
			</button>
		</div>
	</template>
	<!-- behaviour on change already created build -->
	<template v-if="openedInSingleBuild">
		<div class="calculator__save-btn">
			<button
				class="btn btn-main"
				@click="showSaveModal = true"
				:disabled="!auth"
				id="saveBuild"
			>
				Сохранить сборку
			</button>
		</div>
	</template>
	<!-- modal on save -->
	<Teleport to="body">
		<calculator-save-modal
			v-if="showSaveModal"
			@closeModal="showSaveModal = false"
			@saveBuild="saveBuild"
			:soldierClass="soldierClass"
			:openedInSingleBuild="openedInSingleBuild"
			:item="item"
			@modifyBuild="modifyBuild"
		></calculator-save-modal>
	</Teleport>

	<!-- error -->
	<error-block :errorArray="errorArray"></error-block>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref, Ref } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import CalculatorSaveModal from './CalculatorSaveModal.vue';
import { SkillBranch, SkillEntity, SkillPossibleTiers } from '@/type/Skills';
import { SkillTag } from '@/type/SkillTag';
import ErrorBlock from '@/components/error/ErrorBlock.vue';
import { IErrorEntity } from '@/type/CustomErrors';
import {
	saveToLocalStorageArray,
	loadFromLocalStorageArray,
} from '@/functions/localStorageUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from 'vuex';
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { ISkillBuild } from '@/type/SkillBuild';
import { SoldierID } from '@/type/Soldier';
import { db } from '@/firebase/firebase';
import { useRoute } from 'vue-router';

export default defineComponent({
	components: { CalculatorBranch, ErrorBlock, CalculatorSaveModal },
	props: {
		stats: {
			required: true,
			type: Object as PropType<[number, number, number]>,
		},
		tags: {
			required: true,
			type: Object,
		},
		soldierClass: {
			required: true,
			type: String as PropType<SoldierID>,
			default: 'custom',
		},
		isOpenedBySkillBuild: {
			required: false,
			type: Boolean,
			default: false,
		},
		dataFromDB: {
			required: false,
			type: Object as PropType<ISkillBuild['skillsData']>,
		},
		openedInSingleBuild: {
			required: false,
			type: Boolean,
		},
		item: {
			required: false,
			type: Object as PropType<ISkillBuild>,
		},
		userData: {
			required: false,
			type: Object as PropType<{
				photoURL: string;
				displayName: string;
				dbId: string;
			}>,
		},
	},
	setup(props) {
		const store = useStore();
		const reactiveSkillsList = reactive(skillsList);

		// Это мы получаем от выбранного солдата (переданных пропсов)
		const statsPool = reactive(props.stats);
		const tags: SkillTag[] = reactive(props.tags as SkillTag[]);

		const remainingStats = reactive([] as number[]);

		const router = useRoute();
		const routerPathArray = router.path.split('/');
		const buildID = routerPathArray[routerPathArray.length - 1];

		onMounted(() => {
			if (props.dataFromDB) {
				calculateStatsOnLoad(props.dataFromDB);
			} else {
				resetStatsOnLoad();
			}
			calculateRemainingStats();
			countHowMuchIsSpentOnTier1();
		});

		// AUTHENTIFICATION
		let auth = ref(getAuth().currentUser);

		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				auth.value = getAuth().currentUser;
			} else {
				auth.value = null;
			}
		});

		function openLoginPopup() {
			store.commit('showLoginPopup');
		}
		// ==============

		function calculateRemainingStats() {
			// Очищаем массив, чтобы сохранить его реактивность
			remainingStats.length = 0;

			// Копируем оригинальные статы в массив remainingStats
			statsPool.forEach((stat: number) => {
				remainingStats.push(stat);
			});

			// Проходим по всем веткам и навыкам
			let branchIndex = 0;
			reactiveSkillsList.forEach((branch: SkillBranch) => {
				for (const tierKey in branch) {
					if (Object.prototype.hasOwnProperty.call(branch, tierKey)) {
						const tier = branch[tierKey as keyof SkillBranch];
						for (const skillKey in tier) {
							if (Object.prototype.hasOwnProperty.call(tier, skillKey)) {
								const skill = tier[
									skillKey as keyof typeof tier
								] as SkillEntity;
								// Уменьшаем remainingStats на потраченные статы для данного навыка
								remainingStats[branchIndex] -= skill.curLvl * skill.costPerLvl;
							}
						}
					}
				}

				branchIndex++;
			});

			// console.log(remainingStats);
		}

		function statChanged(payload: {
			skillKey: string;
			curLvl: number;
			branchTier: SkillPossibleTiers;
			branchIndex: number;
		}) {
			// console.log('CalculatorBlock payload:');
			// console.log(payload);

			const { skillKey, curLvl, branchTier, branchIndex } = payload;
			reactiveSkillsList[branchIndex][branchTier][skillKey].curLvl = curLvl;
			calculateRemainingStats();
			countHowMuchIsSpentOnTier1();
		}

		function resetStatsOnLoad() {
			reactiveSkillsList.forEach((branch: SkillBranch) => {
				for (const tierKey in branch) {
					if (Object.prototype.hasOwnProperty.call(branch, tierKey)) {
						const tier = branch[tierKey as keyof SkillBranch];
						for (const skillKey in tier) {
							if (Object.prototype.hasOwnProperty.call(tier, skillKey)) {
								const skill = tier[
									skillKey as keyof typeof tier
								] as SkillEntity;
								// Сбрасываем в 0;
								skill.curLvl = 0;
							}
						}
					}
				}
			});
		}

		function calculateStatsOnLoad(dataFromDB: ISkillBuild['skillsData']) {
			reactiveSkillsList.forEach((branch: SkillBranch, idx) => {
				const currentBranch = ['mobility', 'vitality', 'weapon'][idx];
				for (const tierKey in branch) {
					if (Object.prototype.hasOwnProperty.call(branch, tierKey)) {
						const tier = branch[tierKey as keyof SkillBranch];
						for (const skillKey in tier) {
							if (Object.prototype.hasOwnProperty.call(tier, skillKey)) {
								const skill = tier[
									skillKey as keyof typeof tier
								] as SkillEntity;
								// Находим соответствующий скилл в данных из БД и сбрасываем его уровень в 0
								// @ts-ignore
								const foundSkill = dataFromDB[currentBranch]?.[tierKey]?.find(
									// @ts-ignore
									(s) => s.skillKey === skillKey
								);
								if (foundSkill) {
									skill.curLvl = foundSkill.curLvl;
								} else {
									skill.curLvl = 0;
								}
							}
						}
					}
				}
			});
		}

		const pointsSpentOnTier1: Ref<number> = ref(0);
		function countHowMuchIsSpentOnTier1() {
			pointsSpentOnTier1.value = 0;

			reactiveSkillsList.forEach((branch: SkillBranch) => {
				for (const skillKey in branch['tier1']) {
					if (Object.prototype.hasOwnProperty.call(branch['tier1'], skillKey)) {
						const skill = branch['tier1'][
							skillKey as keyof (typeof branch)['tier1']
						] as SkillEntity;
						// Считаем потраченные поинты со всех тир1 скиллов;
						pointsSpentOnTier1.value =
							pointsSpentOnTier1.value + skill.curLvl * skill.costPerLvl;
					}
				}
			});
		}

		// Error Handler

		const errorArray: Ref<IErrorEntity[]> = ref([]);
		let timerId: ReturnType<typeof setTimeout>;

		function notEnoughPoints(payload: IErrorEntity) {
			clearErrors();
			createError(payload);

			timerId = setTimeout(() => {
				clearErrors();
			}, 2000);
		}

		function clearErrors() {
			if (errorArray.value.length > 1) {
				errorArray.value.shift();
			}
			clearTimeout(timerId);
			clearArrayAfterDelay(errorArray.value, 2000);
		}

		function createError(payload: IErrorEntity) {
			if (errorArray) {
				errorArray.value.push(payload);
			}
		}

		function clearArrayAfterDelay(array: IErrorEntity[], delay: number) {
			timerId = setTimeout(() => {
				array.shift();
			}, delay);
		}

		// Save functionality
		const showSaveModal: Ref<boolean> = ref(false);

		async function saveBuild(payload: { title: string; isPublic: boolean }) {
			const { title, isPublic } = payload;
			const savedData: ISkillBuild = {
				data: {
					name: title,
					nameLowercase: title.toLowerCase(),
					author: auth.value?.uid || '',
					createdAt: Timestamp.fromDate(new Date(Date.now())),
					isPublic: isPublic,
					isCloned: false,
					likedBy: [],
					// @ts-ignore
					likesAmount: 0,
				},
				soldierClass: props.soldierClass,
				tags: tags,
				stats: props.stats,
				skillsData: {
					mobility: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier1') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier2') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier3') || [
							{ skillKey: '', curLvl: 0 },
						],
					},
					vitality: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier1') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier2') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier3') || [
							{ skillKey: '', curLvl: 0 },
						],
					},
					weapon: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier1') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier2') || [
							{ skillKey: '', curLvl: 0 },
						],
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier3') || [
							{ skillKey: '', curLvl: 0 },
						],
					},
				},
			};
			console.log(savedData);

			try {
				const docRef = await addDoc(collection(db, 'builds'), savedData);
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}

			// FOR TESTING PURPOSES: saving to localStorage
			// loadFromLocalStorageArray('savedSkills');
			// saveToLocalStorageArray('savedSkills', savedData);
		}

		function getAuthor() {
			const auth = getAuth();
			return auth?.currentUser?.uid || null;
		}
		console.log(getAuthor());

		function getSkillsLevelsFromBranch(branchIndex: number) {
			return reactiveSkillsList[branchIndex];
		}

		function getSkillsLevelsFromTier(
			branch: SkillBranch,
			tierIndex: 'tier1' | 'tier2' | 'tier3'
		) {
			if (branch) {
				let tierData = [];
				const tier = branch[tierIndex as keyof SkillBranch];
				for (const skillKey in tier) {
					if (Object.prototype.hasOwnProperty.call(tier, skillKey)) {
						const skill = tier[skillKey as keyof typeof tier] as SkillEntity;
						// Сохраняем все скиллы
						let skillData = { skillKey, curLvl: skill.curLvl };
						tierData.push(skillData);
					}
				}
				return tierData;
			}
		}

		function modifyBuild(payload: {
			saveAction: 'update' | 'new';
			title: string;
			isPublic: boolean;
		}) {
			console.log(payload);
			saveModifiedBuild(payload);
		}

		async function saveModifiedBuild(payload: {
			saveAction: 'update' | 'new';
			title: string;
			isPublic: boolean;
		}) {
			const { saveAction, title, isPublic } = payload;

			console.log(props.item);
			console.log(skillsList);

			if (saveAction === 'new') {
				const savedData: ISkillBuild = {
					data: {
						name: title,
						nameLowercase: title.toLowerCase(),
						author: auth.value?.uid || '',
						createdAt: Timestamp.fromDate(new Date(Date.now())),
						isPublic: false,
						isCloned: true,
						likedBy: [],
						// @ts-ignore
						likesAmount: 0,
					},
					soldierClass: props.soldierClass,
					tags: tags,
					stats: props.stats,
					skillsData: {
						mobility: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
						vitality: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
						weapon: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
					},
				};
				console.log(savedData);

				try {
					const docRef = await addDoc(collection(db, 'builds'), savedData);
					console.log('Document written with ID: ', docRef.id);
				} catch (e) {
					console.error('Error adding document: ', e);
				}
			} else if (
				saveAction === 'update' &&
				props.userData?.dbId == auth.value?.uid
			) {
				const savedData: ISkillBuild = {
					data: {
						name: title,
						nameLowercase: title.toLowerCase(),
						author: auth.value?.uid || '',
						createdAt: Timestamp.fromDate(new Date(Date.now())),
						isPublic: props.item?.data.isPublic || false,
						isCloned: false,
						likedBy: props.item?.data.likedBy || [],
						// @ts-ignore
						likesAmount: props.item?.data.likesAmount || 0,
					},
					soldierClass: props.soldierClass,
					tags: tags,
					stats: props.stats,
					skillsData: {
						mobility: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[0],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
						vitality: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[1],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
						weapon: {
							tier1: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier1'
							) || [{ skillKey: '', curLvl: 0 }],
							tier2: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier2'
							) || [{ skillKey: '', curLvl: 0 }],
							tier3: getSkillsLevelsFromTier(
								reactiveSkillsList[2],
								'tier3'
							) || [{ skillKey: '', curLvl: 0 }],
						},
					},
				};
				console.log(savedData);

				try {
					const docRef = doc(db, 'builds', buildID);
					await updateDoc(docRef, { ...savedData });
					console.log(`${savedData.data.name} updated!`);
				} catch (e) {
					console.error('Error adding document: ', e);
				}
			}
		}

		// Then you can work with reactiveSkillsList as a final product
		return {
			skillsList: reactiveSkillsList,
			statsPool,
			tags,
			calculateRemainingStats,
			remainingStats,
			statChanged,
			pointsSpentOnTier1,
			notEnoughPoints,
			errorArray,
			showSaveModal,
			saveBuild,
			auth,
			openLoginPopup,
			modifyBuild,
		};
	},
});
</script>
