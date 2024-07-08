<template>
	<div class="calculator__stats-block">
		<calculator-base-perk
			v-if="
				branchIndex === 0 && branchTier === 'tier1' && soldierClass !== 'custom'
			"
			:soldierClass="soldierClass"
		>
		</calculator-base-perk>
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
import { SoldierID } from '@/type/Soldier';
import { defineComponent, onMounted, PropType } from 'vue';
import CalculatorSkill from './CalculatorSkill.vue';
import CalculatorBasePerk from '@/components/calculator/CalculatorBasePerk.vue';

export default defineComponent({
	components: { CalculatorSkill, CalculatorBasePerk },
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
		soldierClass: {
			required: true,
			type: String as PropType<SoldierID>,
		},
	},
	setup(props, context) {
		function statChanged(payload: { skillKey: string; curLvl: number }) {
			context.emit('statChanged', {
				...payload,
				branchTier: props.branchTier,
				branchIndex: props.branchIndex,
			});
		}

		onMounted(() => {});

		return {
			statChanged,
		};
	},
});
</script>
