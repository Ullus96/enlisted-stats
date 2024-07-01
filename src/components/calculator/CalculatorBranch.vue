<template>
	<div class="calculator__branch">
		<div
			class="calculator__hotkeys-block tooltip-anchor--no-relative"
			v-if="branchIndex === 0"
		>
			<IconBase :iconName="'Hotkeys'">
				<IconQuestionCircle />
			</IconBase>
			<TooltipComponent :direction="'right'" :width="30">
				<p>При нажатии по иконке скилла:</p>
				<p><span class="hotkey">ЛКМ</span> - повысить уровень на 1</p>
				<p><span class="hotkey">ПКМ</span> - понизить уровень на 1</p>
			</TooltipComponent>
		</div>
		<div class="calculator__title-block">
			<img
				:src="require(`@/assets/stat_icons/${statIconLink}`)"
				alt=""
				class="calculator__icon"
			/>
			<h2 class="calculator__remaining-stats">
				<span>{{ remainingStats[branchIndex] }}</span> /
				<span>{{ statsPool[branchIndex] }}</span>
			</h2>
			<div class="calculator__branch-perk-description-wrapper">
				<p class="calculator__branch-perk-description">
					{{ getBranchPerkDescription(branchIndex) }}
					<span :class="classBasedOnIndex">{{
						getBranchPerkAmount(branchIndex, statsPool[branchIndex])
					}}</span>
				</p>
			</div>
		</div>
		<!-- tier 1 -->
		<div class="calculator__separator"></div>
		<calculator-tier
			:tierSkills="skills.tier1"
			:tags="tags"
			:branchColor="classBasedOnIndex"
			:branchIndex="branchIndex"
			:branchTier="'tier1'"
			:branchRemainingStats="getRemainingStats(branchIndex)"
			:soldierClass="soldierClass"
			@statChanged="statChanged"
		></calculator-tier>

		<div class="calculator__separator"></div>

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
				:soldierClass="soldierClass"
				@statChanged="statChanged"
			></calculator-tier>

			<!-- tier 3 -->
			<div class="calculator__separator"></div>

			<calculator-tier
				:tierSkills="skills.tier3"
				:tags="tags"
				:branchColor="classBasedOnIndex"
				:branchIndex="branchIndex"
				:branchTier="'tier3'"
				:branchRemainingStats="getRemainingStats(branchIndex)"
				:soldierClass="soldierClass"
				@statChanged="statChanged"
			></calculator-tier>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import CalculatorTier from './CalculatorTier.vue';
import CalculatorRestriction from './CalculatorRestriction.vue';
import { SkillPossibleTiers } from '@/type/Skills';
import { SoldierID } from '@/type/Soldier';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconQuestionCircle from '@/components/ui/icons/IconQuestionCircle.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: {
		CalculatorTier,
		CalculatorRestriction,
		IconBase,
		IconQuestionCircle,
		TooltipComponent,
	},
	props: {
		skills: { required: true, type: Object },
		branchIndex: { required: true, type: Number },
		statsPool: { required: true, type: Object },
		remainingStats: { required: true, type: Object },
		tags: { required: true, type: Object },
		pointsSpentOnTier1: { required: true, type: Number },
		soldierClass: { required: true, type: String as PropType<SoldierID> },
	},
	setup(props, context) {
		type PossibleClass = 'mobility' | 'vitality' | 'weapon-handling';

		function getClassBasedOnIndex(): PossibleClass {
			switch (props.branchIndex) {
				case 0:
					return 'mobility';
				case 1:
					return 'vitality';
				case 2:
					return 'weapon-handling';

				default:
					throw new Error('No class found at getClassBasedOnIndex()');
			}
		}

		const classBasedOnIndex = getClassBasedOnIndex();
		const statIconLink = getStatIconLink();

		function getStatIconLink(): string {
			switch (props.branchIndex) {
				case 0:
					return 'mobility.svg';
				case 1:
					return 'vitality.svg';
				case 2:
					return 'weapon.svg';

				default:
					return 'unknown.svg';
			}
		}

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

		return {
			classBasedOnIndex,
			statIconLink,
			isHigherTiersBlocked,
			howManyPointsToUnlock,
			statChanged,
			getRemainingStats,
			getBranchPerkDescription,
			getBranchPerkAmount,
		};
	},
});
</script>
