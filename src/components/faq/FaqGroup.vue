<template>
	<h3 class="faq__group-title" v-if="title" v-text="title"></h3>
	<div class="faq__group">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, provide, Ref, ref } from 'vue';

export default defineComponent({
	props: {
		title: {
			required: false,
			type: String,
		},
	},
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
