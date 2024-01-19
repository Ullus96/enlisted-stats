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
	<!-- modal on save -->
	<Teleport to="body">
		<calculator-save-modal
			v-if="showSaveModal"
			@closeModal="showSaveModal = false"
			@saveBuild="saveBuild"
			:soldierClass="soldierClass"
		></calculator-save-modal>
	</Teleport>

	<!-- {{ savedDataOut }} -->
	<div v-if="savedDataOut">
		{{ savedDataOut.data.name }}
		{{ savedDataOut.data.author }}
		{{ savedDataOut.data.date }}
		{{ savedDataOut.data.key }}
	</div>
	<div v-if="savedDataOut">Tags: {{ savedDataOut.tags }}</div>
	<div v-if="savedDataOut">SoldierClass: {{ savedDataOut.soldierClass }}</div>
	<div v-if="savedDataOut">Stats: {{ savedDataOut.stats }}</div>
	<div
		style="
			display: flex;
			flex-direction: row;
			gap: 5px;
			justify-content: center;
		"
	>
		<div
			v-for="(branch, branchName) in savedDataOut.skillsData"
			:key="branch"
			style="flex-grow: 1"
		>
			<h2>{{ branchName }}</h2>
			<div v-for="(tier, tierName) in branch" :key="tier">
				<h3>{{ tierName }}</h3>
				<div v-for="skill in tier" :key="skill">
					<p>{{ skill.skillKey }}: {{ skill.curLvl }}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- error -->
	<error-block :errorArray="errorArray"></error-block>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref, watch } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import CalculatorSaveModal from './CalculatorSaveModal.vue';
import { SkillBranch, SkillEntity, SkillPossibleTiers } from '@/type/Skills';
import { SkillTag } from '@/type/SkillTag';
import ErrorBlock from '@/components/error/ErrorBlock.vue';
import { IErrorEntity } from '@/type/CustomErrors';
import {
	saveToLocalStorage,
	loadFromLocalStorage,
} from '@/functions/localStorageUtils';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from 'vuex';

export default defineComponent({
	components: { CalculatorBranch, ErrorBlock, CalculatorSaveModal },
	props: {
		stats: {
			required: true,
			type: Object,
		},
		tags: {
			required: true,
			type: Object,
		},
		soldierClass: {
			required: true,
			type: String,
			default: 'custom',
		},
	},
	setup(props) {
		const store = useStore();
		const reactiveSkillsList = reactive(skillsList);

		// Это мы получаем от выбранного солдата (переданных пропсов)
		const statsPool = reactive(props.stats);
		const tags: SkillTag[] = reactive(props.tags as SkillTag[]);

		const remainingStats = reactive([] as number[]);

		onMounted(() => {
			resetStatsOnLoad();
			calculateRemainingStats();
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
		function generateKey() {
			return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
		}

		const savedDataOut: Ref<any> = ref('');

		function saveBuild(payload: { title: string; isPublic: boolean }) {
			const { title, isPublic } = payload;
			const savedData = {
				data: {
					name: title,
					author: getAuthor(),
					date: new Date(),
					isPublic: isPublic,
					key: generateKey(),
				},
				soldierClass: props.soldierClass,
				tags: tags,
				stats: props.stats,
				skillsData: {
					mobility: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier1'),
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier2'),
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[0], 'tier3'),
					},
					vitality: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier1'),
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier2'),
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[1], 'tier3'),
					},
					weapon: {
						tier1: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier1'),
						tier2: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier2'),
						tier3: getSkillsLevelsFromTier(reactiveSkillsList[2], 'tier3'),
					},
				},
			};
			console.log(savedData);
			savedDataOut.value = savedData;

			loadFromLocalStorage('savedSkills');
			saveToLocalStorage('savedSkills', savedData);
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
			savedDataOut,
			auth,
			openLoginPopup,
		};
	},
});
</script>
