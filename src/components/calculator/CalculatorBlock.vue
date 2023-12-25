<template>
	<button @click="calculateRemainingStats">Calculate Remaining Pool</button>
	{{ remainingStats }}
	<div class="calculator__grid">
		<calculator-branch
			v-for="(branch, index) in skillsList"
			:key="branch"
			:skills="skillsList[index]"
			:index="index"
			:statsPool="remainingStats"
		></calculator-branch>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import { SkillBranch, SkillEntity } from '@/type/Skills';

export default defineComponent({
	components: { CalculatorBranch },
	setup(props) {
		const statsPool = reactive([21, 19, 20]);
		const reactiveSkillsList = reactive(skillsList);

		const remainingStats = reactive([] as number[]);

		onMounted(() => {
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

			console.log(remainingStats);
		}

		// Then you can work with reactiveSkillsList as a final product
		return {
			skillsList: reactiveSkillsList,
			statsPool,
			calculateRemainingStats,
			remainingStats,
		};
	},
});
</script>
