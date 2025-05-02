<template>
	<details :open="isOpen" @click.prevent="handleClick">
		<summary v-text="title"></summary>
		<slot></slot>
	</details>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		title: {
			required: true,
			type: String,
		},
	},
	emits: ['handleClick'],
	setup(props) {
		const openedIndex = inject('openedIndex') as Ref<number | null>;
		const setOpenedIndex = inject('setOpenedIndex') as (index: number) => void;
		const registerItem = inject('registerItem') as () => number;

		const index: Ref<number | null> = ref(null);

		onMounted(() => {
			index.value = registerItem();
		});

		const isOpen = computed(() => openedIndex.value === index.value);

		function handleClick() {
			if (index.value !== null) {
				setOpenedIndex(index.value);
			}
		}

		return { isOpen, handleClick };
	},
});
</script>

<style scoped></style>
