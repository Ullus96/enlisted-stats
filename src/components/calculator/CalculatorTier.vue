<template>
	<div class="calculator__stats-block">
		<calculator-skill
			v-for="(item, index) in tierSkills"
			:key="item"
			:skill="tierSkills[index]"
			:branchColor="branchColor"
			:tags="tags"
			:skillKey="index"
			:branchRemainingStats="branchRemainingStats"
			@statChanged="statChanged"
		></calculator-skill>
	</div>
</template>

<script lang="ts">
import { SkillPossibleTiers } from '@/type/Skills';
import { defineComponent, onMounted, PropType } from 'vue';
import CalculatorSkill from './CalculatorSkill.vue';

export default defineComponent({
	components: { CalculatorSkill },
	props: {
		tierSkills: { required: true, type: Object },
		branchColor: { required: true, type: String },
		tags: { required: true, type: Object },
		branchIndex: { required: true, type: Number },
		branchTier: {
			required: true,
			type: String as PropType<SkillPossibleTiers>,
		},
		branchRemainingStats: {
			required: true,
		},
	},
	setup(props, context) {
		function statChanged(payload: { skillKey: string; curLvl: number }) {
			context.emit('statChanged', {
				...payload,
				branchTier: props.branchTier,
				branchIndex: props.branchIndex,
			});

			console.log('CalculatorTier payload:');
			console.log(payload);
		}

		onMounted(() => {
			console.log(props.branchRemainingStats);
		});

		return {
			statChanged,
		};
	},
});
</script>
