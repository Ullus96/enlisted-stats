<template>
	<div>
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

		provide('openedIndex', openedIndex);
		provide('setOpenedIndex', setOpenedIndex);

		return {};
	},
});
</script>

<style scoped></style>
