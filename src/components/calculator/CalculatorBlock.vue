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
			@statChanged="statChanged"
		></calculator-branch>
	</div>

	<!-- error -->
	<Teleport to="body">
		<div class="calculator__error" v-if="false">Недостаточно очков!</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';
import { SkillBranch, SkillEntity, SkillPossibleTiers } from '@/type/Skills';
import { SkillTag } from '@/type/SkillTag';

export default defineComponent({
	components: { CalculatorBranch },
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
		// TODO: onMounted сделать так, чтобы стандартные статы
		// сбрасывались к оригинальным
		const reactiveSkillsList = reactive(skillsList);

		// const statsPool = reactive([16, 16, 16]);
		// const tags: SkillTag[] = reactive(['base']);

		// Это мы получаем от выбранного солдата
		const statsPool = reactive(props.stats);
		const tags: SkillTag[] = reactive(props.tags as SkillTag[]);

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
		}

		// Then you can work with reactiveSkillsList as a final product
		return {
			skillsList: reactiveSkillsList,
			statsPool,
			tags,
			calculateRemainingStats,
			remainingStats,
			statChanged,
		};
	},
});
</script>
