<template>
	<div class="calculator__grid">
		<div class="calculator__branch" v-for="item in 3" :key="item">
			<div class="calculator__title-block">
				<h2 class="calculator__title mobility">Мобильность</h2>
				<p>Нераспределенные очки: <span class="mobility">16</span></p>
			</div>

			<!-- tier 1 -->
			<calculator-branch></calculator-branch>

			<div class="calculator__restriction-block">
				<!-- block if user didn't spend 6 points -->
				<calculator-restriction v-if="true"></calculator-restriction>

				<!-- tier 2 -->
				<calculator-branch></calculator-branch>

				<!-- tier 3 -->
				<calculator-branch></calculator-branch>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorBranch from './CalculatorBranch.vue';
import CalculatorRestriction from './CalculatorRestriction.vue';

export default defineComponent({
	components: { CalculatorBranch, CalculatorRestriction },
	setup() {},
});
</script>
