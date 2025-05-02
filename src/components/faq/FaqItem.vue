<template>
	<details :open="isOpen" @click.prevent="handleClick">
		<summary v-text="title"></summary>
		<slot></slot>
	</details>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';

export default defineComponent({
	props: {
		title: {
			required: true,
			type: String,
		},
		index: {
			required: true,
			type: Number,
		},
	},
	emits: ['handleClick'],
	setup(props) {
		const openedIndex = inject('openedIndex') as Ref<number | null>;
		const setOpenedIndex = inject('setOpenedIndex') as (index: number) => void;

		const isOpen = computed(() => openedIndex.value === props.index);

		function handleClick() {
			setOpenedIndex(props.index);
		}

		return { isOpen, handleClick };
	},
});
</script>

<style scoped></style>
