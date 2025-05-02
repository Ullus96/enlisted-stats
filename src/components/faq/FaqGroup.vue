<template>
	<!-- Paste header of a group here -->
	<div class="faq__group">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, provide, Ref, ref } from 'vue';

export default defineComponent({
	setup() {
		const openedIndex: Ref<number | null> = ref(null);

		function setOpenedIndex(index: number) {
			openedIndex.value = index;
		}

		const childCount = ref(0);

		function registerItem(): number {
			const index = childCount.value;
			childCount.value++;
			return index;
		}

		provide('openedIndex', openedIndex);
		provide('setOpenedIndex', setOpenedIndex);
		provide('registerItem', registerItem);

		return {};
	},
});
</script>

<style scoped></style>
