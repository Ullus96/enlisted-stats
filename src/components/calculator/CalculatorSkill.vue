<template>
	<div class="calculator__skill">
		<img
			:src="require('@/assets/skill_icons/' + skill.icon)"
			alt=""
			class="calculator__img"
			@click="clickHandle('plus')"
			@contextmenu.prevent="clickHandle('minus')"
		/>
		<div class="calculator__tooltip">
			<!-- <span class="calculator__highlight">+25%</span>/+50%/+75% -->
			<template
				v-for="(progression, index) in skill.progression"
				:key="progression"
			>
				<span
					:class="skill.curLvl == index + 1 ? 'calculator__highlight' : ''"
					>{{ progression }}</span
				>
				<span>{{ index == skill.progression.length - 1 ? '' : ' / ' }}</span>
			</template>

			<div class="calculator__tooltip-desc-block">
				<template v-for="desc in skill.desc.split(';')" :key="desc">
					<span class="calculator__tooltip-desc">{{ desc }}</span>
				</template>
			</div>
		</div>
		<div class="calculator__counter-block">
			<button class="btn calculator__button" @click="clickHandle('minus')">
				-
			</button>
			<div class="calculator__level">
				<span>{{ skill.curLvl }}</span>
				<span>/</span>
				<span>{{ skill.maxLvl }}</span>
			</div>
			<button class="btn calculator__button" @click="clickHandle('plus')">
				+
			</button>
		</div>
		<div class="calculator__cost-block" :class="branchColor">
			<span class="calculator__cost">
				<b>{{ skill.costPerLvl }}</b></span
			>
			/
			<span class="calculator__total-spent">{{
				skill.costPerLvl * skill.curLvl
			}}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { SkillEntity } from '@/type/Skills';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		skill: {
			required: true,
			type: Object as PropType<SkillEntity>,
		},
		branchColor: {
			required: true,
			type: String,
		},
	},
	setup(props) {
		function clickHandle(operation: 'plus' | 'minus') {
			if (operation === 'plus') {
				if (props.skill.curLvl == props.skill.maxLvl) {
					props.skill.curLvl = props.skill.maxLvl;
				} else {
					props.skill.curLvl++;
				}
			} else {
				if (props.skill.curLvl == 0) {
					props.skill.curLvl = 0;
				} else {
					props.skill.curLvl--;
				}
			}
		}

		return {
			clickHandle,
		};
	},
});
</script>
