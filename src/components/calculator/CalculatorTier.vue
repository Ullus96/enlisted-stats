<template>
	<div class="calculator__stats-block">
		<calculator-skill
			v-for="(item, index) in tierSkills"
			:key="item"
			:skill="tierSkills[index]"
		></calculator-skill>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorSkill from './CalculatorSkill.vue';

export default defineComponent({
	components: { CalculatorSkill },
	props: { tierSkills: { required: true, type: Object } },
	setup() {},
});
</script>
