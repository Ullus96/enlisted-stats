<template>
	<div class="calculator__branch">
		<div class="calculator__title-block">
			<h2 class="calculator__title" :class="classBasedOnIndex">
				{{ ['Мобильность', 'Живучесть', 'Оружие'][index] }}
			</h2>
			<p>Нераспределенные очки: <span :class="classBasedOnIndex">16</span></p>
		</div>
		<!-- tier 1 -->
		<calculator-tier :tierSkills="skills.tier1"></calculator-tier>

		<div class="calculator__restriction-block">
			<!-- block if user didn't spend 6 points -->
			<calculator-restriction v-if="!true"></calculator-restriction>

			<!-- tier 2 -->
			<calculator-tier :tierSkills="skills.tier2"></calculator-tier>

			<!-- tier 3 -->
			<calculator-tier :tierSkills="skills.tier3"></calculator-tier>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorTier from './CalculatorTier.vue';
import CalculatorRestriction from './CalculatorRestriction.vue';

export default defineComponent({
	components: { CalculatorTier, CalculatorRestriction },
	props: {
		skills: { required: true, type: Object },
		index: { required: true, type: Number },
	},
	setup(props) {
		type PossibleClass = 'mobility' | 'vitality' | 'weapon-handling';

		function getClassBasedOnIndex(): PossibleClass {
			switch (props.index) {
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

		return {
			classBasedOnIndex,
		};
	},
});
</script>
