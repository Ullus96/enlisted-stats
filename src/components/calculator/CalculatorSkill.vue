<template>
	<div class="calculator__skill" v-if="hasTag()">
		<img
			:src="require('@/assets/skill_icons/' + skill.icon)"
			alt=""
			class="calculator__img"
			:class="{ [branchColor]: skill.curLvl }"
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
			<div class="calculator__bars-wrapper">
				<div
					class="calculator__bar"
					v-for="(item, index) in skill.maxLvl"
					:key="item"
					:class="{
						'calculator__bar-highlight': index < skill.curLvl,
						[branchColor]: true,
					}"
				>
					&nbsp;
				</div>
			</div>
			<button class="btn calculator__button" @click="clickHandle('plus')">
				+
			</button>
		</div>
		<div class="calculator__cost-block">
			<template v-for="(item, index) in skill.maxLvl" :key="item">
				<span :class="{ calculator__highlight: skill.curLvl == index + 1 }">{{
					(index + 1) * skill.costPerLvl
				}}</span>
				<span>{{ index == skill.maxLvl - 1 ? '' : '/' }}</span>
			</template>
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
		tags: {
			required: true,
			type: Object,
		},
		skillKey: {
			required: true,
			type: String,
		},
		branchRemainingStats: {
			required: true,
		},
	},
	setup(props, context) {
		function clickHandle(operation: 'plus' | 'minus') {
			if (operation === 'plus') {
				if (props.skill.curLvl == props.skill.maxLvl) {
					props.skill.curLvl = props.skill.maxLvl;
				} else {
					if (checkIfEnoughPoints(props.skill.costPerLvl)) {
						props.skill.curLvl++;
					}
				}
			} else {
				if (props.skill.curLvl == 0) {
					props.skill.curLvl = 0;
				} else {
					props.skill.curLvl--;
				}
			}

			context.emit('statChanged', {
				skillKey: props.skillKey,
				curLvl: props.skill.curLvl,
			});
		}

		function checkIfEnoughPoints(cost: number): boolean {
			if (typeof props.branchRemainingStats === 'number') {
				return props.branchRemainingStats - cost >= 0;
			} else {
				return false;
			}
		}

		function hasTag(): boolean {
			return props.skill.tags.some((element) => props.tags.includes(element));
		}

		return {
			clickHandle,
			hasTag,
		};
	},
});
</script>
