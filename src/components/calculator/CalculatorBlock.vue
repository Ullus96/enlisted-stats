<template>
	<div
		class="calculator"
		:class="{ compact: $store.state.settings.compactMode }"
		ref="calcElem"
	>
		<div class="calculator__grid">
			<calculator-branch
				v-for="(branch, index) in skillsList"
				:key="String(branch.tier1)"
				:skills="skillsList[index]"
				:branchIndex="index"
				:remainingStats="remainingStats ? remainingStats : statsPool"
				:statsPool="statsPool"
				:tags="tags"
				:pointsSpentOnTier1="pointsSpentOnTier1"
				:soldierClass="soldierClass"
				@statChanged="statChanged"
			></calculator-branch>
		</div>
	</div>

	<!-- if not authorized - tell user that he needs 
		to login to save skill build -->
	<template v-if="!auth">
		<div class="calculator__tell-to-login">
			Ты не авторизован.
			<a
				href="#"
				class="link"
				@click.prevent="$store.state.modal.isLoginModalVisible = true"
				>Зарегистрируйся или войди</a
			>
			в аккаунт, чтобы сохранять свои сборки и делиться ими с другими.
		</div>
	</template>
	<!-- Default behaviour if opened by Table or Calculator -->
	<template v-if="!isOpenedBySkillBuild">
		<div class="calculator__save-btn">
			<button
				class="btn btn-m btn-primary"
				@click="$store.state.modal.isBuildSaveModalVisible = true"
				:disabled="!auth"
				id="saveBuild"
				v-ripple
			>
				Сохранить сборку
			</button>
		</div>
	</template>
	<!-- behaviour on change already created build -->
	<template v-if="openedInSingleBuild">
		<div class="calculator__save-btn">
			<button
				class="btn btn-m btn-primary"
				@click="$store.state.modal.isBuildSaveModalVisible = true"
				:disabled="!auth"
				id="saveBuild"
				v-ripple
			>
				Сохранить сборку
			</button>
		</div>
	</template>
	<!-- modal on save -->
	<Teleport to="body">
		<calculator-save-modal
			v-if="$store.state.modal.isBuildSaveModalVisible"
			@saveBuild="saveBuild"
			:soldierClass="soldierClass"
			:openedInSingleBuild="openedInSingleBuild"
			:item="item"
			:preset-value="buildTitle"
			@modifyBuild="modifyBuild"
		></calculator-save-modal>
	</Teleport>

	<!-- Кнопка для расположения калькулятора вверху экрана -->
	<template v-if="mounted">
		<Teleport to="#screen-bottom">
			<div class="calculator__btn-screen-wrapper tooltip-anchor--no-relative">
				<TooltipComponent :direction="'left'" :width="25" :color="'dark'">
					<p>Расположить калькулятор сверху экрана</p>
				</TooltipComponent>
				<button
					class="btn btn-m btn-secondary calculator__btn-screen"
					@click="moveToUpperBoundary"
					v-ripple
				>
					<IconBase>
						<IconArrowUp />
					</IconBase>
				</button>
			</div>
		</Teleport>
	</template>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref, Ref } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import CalculatorSaveModal from './CalculatorSaveModal.vue';
import { SkillBranch, SkillEntity, SkillPossibleTiers } from '@/type/Skills';
import { SkillTag } from '@/type/SkillTag';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from '@/store/useStore';
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
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconArrowUp from '@/components/ui/icon/icons/IconArrowUp.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: {
		CalculatorBranch,
		CalculatorSaveModal,
		IconBase,
		IconArrowUp,
		TooltipComponent,
	},
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
								// @ts-expect-error
								const foundSkill = dataFromDB[currentBranch]?.[tierKey]?.find(
									// @ts-expect-error
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

		// Save functionality
		const showSaveModal: Ref<boolean> = ref(false);

		async function saveBuild(payload: { title: string; isPublic: boolean }) {
			const { title, isPublic } = payload;
			const timestampNow = Timestamp.fromDate(new Date(Date.now()));
			const savedData: ISkillBuild = {
				data: {
					name: title,
					nameLowercase: title.toLowerCase(),
					author: auth.value?.uid || '',
					createdAt: timestampNow,
					updatedAt: timestampNow,
					isPublic: isPublic,
					isCloned: false,
					likedBy: [],
					// @ts-expect-error
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

		const buildTitle: Ref<string | undefined> = ref(props.item?.data.name);

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
			const timestampNow = Timestamp.fromDate(new Date(Date.now()));

			console.log(props.item);
			console.log(skillsList);

			if (saveAction === 'new') {
				const savedData: ISkillBuild = {
					data: {
						name: title,
						nameLowercase: title.toLowerCase(),
						author: auth.value?.uid || '',
						createdAt: props.item?.data.createdAt || timestampNow,
						updatedAt: timestampNow,
						isPublic: false,
						isCloned: true,
						likedBy: [],
						// @ts-expect-error
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
						createdAt: props.item?.data.createdAt || timestampNow,
						updatedAt: timestampNow,
						isPublic: props.item?.data.isPublic || false,
						isCloned: false,
						likedBy: props.item?.data.likedBy || [],
						// @ts-expect-error
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

		// Adjust screen upper position button
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});

		const calcElem: Ref<HTMLElement | null> = ref(null);
		const upperBoundary: Ref<number> = ref(0);

		onMounted(() => {
			if (calcElem.value?.getBoundingClientRect().top) {
				upperBoundary.value = calcElem.value?.getBoundingClientRect().top;
			}
		});

		function moveToUpperBoundary() {
			if (store.state.settings.compactMode) {
				window.scrollTo({
					top: upperBoundary.value - 16,
					behavior: 'smooth',
				});
			} else {
				window.scrollTo({
					top: upperBoundary.value + 210,
					behavior: 'smooth',
				});
			}
		}

		return {
			skillsList: reactiveSkillsList,
			statsPool,
			tags,
			calculateRemainingStats,
			remainingStats,
			statChanged,
			pointsSpentOnTier1,
			showSaveModal,
			saveBuild,
			auth,
			openLoginPopup,
			buildTitle,
			modifyBuild,
			mounted,
			calcElem,
			moveToUpperBoundary,
		};
	},
});
</script>
