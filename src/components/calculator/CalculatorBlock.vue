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

	<!-- error -->
	<error-block :anError="anError"></error-block>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref, watch } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import { SkillBranch, SkillEntity, SkillPossibleTiers } from '@/type/Skills';
import { SkillTag } from '@/type/SkillTag';
import ErrorBlock from '@/components/error/ErrorBlock.vue';
import { IErrorEntity } from '@/type/CustomErrors';

export default defineComponent({
	components: { CalculatorBranch, ErrorBlock },
	props: {
		stats: {
			required: true,
			type: Object,
		},
		tags: {
			required: true,
			type: Object,
		},
	},
	setup(props) {
		const reactiveSkillsList = reactive(skillsList);

		// Это мы получаем от выбранного солдата (переданных пропсов)
		const statsPool = reactive(props.stats);
		const tags: SkillTag[] = reactive(props.tags as SkillTag[]);

		const remainingStats = reactive([] as number[]);

		onMounted(() => {
			resetStatsOnLoad();
			calculateRemainingStats();
		});

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

		const anError: Ref<IErrorEntity | null> = ref(null);
		function notEnoughPoints(payload: { title: string; desc: string }) {
			console.log(payload);
			anError.value = payload;
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
			anError,
		};
	},
});
</script>
