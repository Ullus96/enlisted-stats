<template>
	<div class="calculator__skill">
		<!-- src="@/assets/vector/mobility/1-fire-speed.svg" -->
		<img :src="skill.icon" alt="" class="calculator__img" />
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
			{{ skill.desc }}
		</div>
		<div class="calculator__counter-block">
			<button class="btn calculator__button">-</button>
			<div class="calculator__level">
				<span>{{ skill.curLvl }}</span>
				<span>/</span>
				<span>{{ skill.maxLvl }}</span>
			</div>
			<button class="btn calculator__button">+</button>
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
	},
	setup() {},
});
</script>
