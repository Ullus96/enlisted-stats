<template>
	<div class="calculator__grid">
		<calculator-branch
			v-for="(branch, index) in skillsList"
			:key="branch"
			:skills="skillsList[index]"
			:index="index"
		></calculator-branch>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import skillsList from '@/data/skillsList';
import CalculatorBranch from './CalculatorBranch.vue';

export default defineComponent({
	components: { CalculatorBranch },
	setup() {
		return { skillsList };
	},
});
</script>
