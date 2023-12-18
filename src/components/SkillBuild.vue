<template>
	<div
		class="skills__block container"
		v-for="(item, index) in skills || []"
		:key="item.key"
	>
		<template v-if="activeSkill === index">
			<img
				:src="require(`@/assets/${item.link}`)"
				alt="#"
				class="skills__img container"
			/>
			<p class="skills__label">
				{{ item.title }}, {{ index + 1 }}/{{ skills.length }}
			</p>
			<button
				class="btn skills__btn skills__btn--left"
				@click="handleArrowClick('left')"
			>
				&#8592;
			</button>
			<button
				class="btn skills__btn skills__btn--right"
				@click="handleArrowClick('right')"
			>
				&#8594;
			</button>
		</template>
	</div>
</template>

<script lang="ts">
import { ISkills } from '@/type/Item';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
	props: {
		skills: {
			required: true,
			type: Object as PropType<ISkills[]>,
		},
	},
	setup(props) {
		const activeSkill = ref(0);

		function handleArrowClick(direction: 'left' | 'right') {
			if (direction === 'left') {
				activeSkill.value =
					(activeSkill.value - 1 + props.skills.length) % props.skills.length;
			} else {
				activeSkill.value = (activeSkill.value + 1) % props.skills.length;
			}
		}

		return {
			activeSkill,
			handleArrowClick,
		};
	},
});
</script>
