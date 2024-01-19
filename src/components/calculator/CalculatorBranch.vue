<template>
	<div class="calculator__branch">
		<div class="calculator__hotkeys-block" v-if="branchIndex === 0">
			<i class="fa-regular fa-circle-question"></i>
			<div class="calculator__hotkeys-tooltip">
				<p>При нажатии по иконке скилла:</p>
				<p><span class="hotkey">ЛКМ</span> - повысить уровень на 1</p>
				<p><span class="hotkey">ПКМ</span> - понизить уровень на 1</p>
			</div>
		</div>
		<div class="calculator__title-block">
			<h2 class="calculator__title" :class="classBasedOnIndex">
				{{ ['Мобильность', 'Живучесть', 'Оружие'][branchIndex] }}
				<span>{{ statsPool[branchIndex] }}</span>
			</h2>
			<p>
				Нераспределенные очки:
				<span :class="classBasedOnIndex">{{
					remainingStats[branchIndex]
				}}</span>
			</p>
			<p class="calculator__header-tooltip">
				{{ getBranchPerkDescription(branchIndex) }}
				<span :class="classBasedOnIndex">{{
					getBranchPerkAmount(branchIndex, statsPool[branchIndex])
				}}</span>
			</p>
		</div>
		<!-- tier 1 -->
		<calculator-tier
			:tierSkills="skills.tier1"
			:tags="tags"
			:branchColor="classBasedOnIndex"
			:branchIndex="branchIndex"
			:branchTier="'tier1'"
			:branchRemainingStats="getRemainingStats(branchIndex)"
			@statChanged="statChanged"
			@notEnoughPoints="notEnoughPoints"
		></calculator-tier>

		<div
			class="calculator__restriction-block calculator__restriction-bg"
			:class="{ 'is-transparent': !isHigherTiersBlocked() }"
		>
			<!-- block if user didn't spend 6 points -->
			<!-- v-if="isHigherTiersBlocked()" -->
			<calculator-restriction
				:isHigherTiersBlocked="isHigherTiersBlocked()"
				:howManyPointsToUnlock="howManyPointsToUnlock()"
			></calculator-restriction>

			<!-- tier 2 -->
			<calculator-tier
				:tierSkills="skills.tier2"
				:tags="tags"
				:branchColor="classBasedOnIndex"
				:branchIndex="branchIndex"
				:branchTier="'tier2'"
				:branchRemainingStats="getRemainingStats(branchIndex)"
				@statChanged="statChanged"
				@notEnoughPoints="notEnoughPoints"
			></calculator-tier>

			<!-- tier 3 -->
			<calculator-tier
				:tierSkills="skills.tier3"
				:tags="tags"
				:branchColor="classBasedOnIndex"
				:branchIndex="branchIndex"
				:branchTier="'tier3'"
				:branchRemainingStats="getRemainingStats(branchIndex)"
				@statChanged="statChanged"
				@notEnoughPoints="notEnoughPoints"
			></calculator-tier>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CalculatorTier from './CalculatorTier.vue';
import CalculatorRestriction from './CalculatorRestriction.vue';
import { SkillPossibleTiers } from '@/type/Skills';

export default defineComponent({
	components: { CalculatorTier, CalculatorRestriction },
	props: {
		skills: { required: true, type: Object },
		branchIndex: { required: true, type: Number },
		statsPool: { required: true, type: Object },
		remainingStats: { required: true, type: Object },
		tags: { required: true, type: Object },
		pointsSpentOnTier1: { required: true, type: Number },
	},
	setup(props, context) {
		type PossibleClass = 'mobility' | 'vitality' | 'weapon-handling';

		function getClassBasedOnIndex(): PossibleClass {
			switch (props.branchIndex) {
				case 0:
					return 'mobility';
					break;
				case 1:
					return 'vitality';
					break;
				case 2:
					return 'weapon-handling';
					break;

				default:
					throw new Error('No class found at getClassBasedOnIndex()');
					break;
			}
		}

		const classBasedOnIndex = getClassBasedOnIndex();

		// const isRestricted: Ref<boolean> = ref(false);
		function isHigherTiersBlocked(): boolean {
			if (props.pointsSpentOnTier1 < 6) {
				return true;
			} else {
				return false;
			}
		}

		function howManyPointsToUnlock(): number {
			return 6 - props.pointsSpentOnTier1;
		}

		function statChanged(payload: {
			skillKey: string;
			curLvl: number;
			branchTier: SkillPossibleTiers;
			branchIndex: number;
		}) {
			context.emit('statChanged', payload);
		}

		function getRemainingStats(index: number): number {
			return props.remainingStats[index];
		}

		function getBranchPerkDescription(index: number): string {
			const descriptions = [
				'Увеличение скорости спринта: ',
				'Увеличение количества выносливости: ',
				'Уменьшение вертикальной отдачи при стрельбе из ручного оружия: ',
			];
			return descriptions[index];
		}

		function getBranchPerkAmount(index: number, stat: number): string {
			const amounts = [stat / 2, stat, stat / 2];
			return `${amounts[index]}%`;
		}

		function notEnoughPoints(payload: { title: string; desc: string }) {
			context.emit('notEnoughPoints', payload);
		}

		return {
			classBasedOnIndex,
			isHigherTiersBlocked,
			howManyPointsToUnlock,
			statChanged,
			getRemainingStats,
			getBranchPerkDescription,
			getBranchPerkAmount,
			notEnoughPoints,
		};
	},
});
</script>
