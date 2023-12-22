<template>
	<div class="calculator__stats-block">
		<calculator-skill v-for="item in 5" :key="item"></calculator-skill>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorSkill from './CalculatorSkill.vue';

export default defineComponent({
	components: { CalculatorSkill },
	setup() {},
});
</script>
