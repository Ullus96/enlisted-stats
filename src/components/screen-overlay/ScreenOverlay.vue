<template>
	<div
		class="visible-screen"
		id="visible-screen-40"
		:style="{
			display: screenOverlayVisibility,
		}"
	></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue';
import { useStore } from '@/store/useStore';
import PopUpHandler from '@/components/popup/PopUpHandler.vue';

export default defineComponent({
	components: { PopUpHandler },
	setup() {
		const store = useStore();

		// Computed свойство для проверки, если любой modal видим
		const isAnyModalVisible = computed(() => {
			return Object.values(store.state.modal).some((value) => value);
		});

		const isAnyDialogVisible = computed(() => {
			return Object.values(store.state.dialog).some((value) => value);
		});

		const screenOverlayVisibility: Ref<'flex' | 'none'> = ref('none');

		watch(
			() => isAnyDialogVisible.value,
			(visible) => {
				switchScreenOverlay(visible);
			}
		);

		watch(
			() => isAnyModalVisible.value,
			(visible) => {
				switchScreenOverlay(visible);
			}
		);

		function switchScreenOverlay(visible: boolean) {
			if (visible) {
				screenOverlayVisibility.value = 'flex';
				document.body.style.overflow = 'hidden';
			} else {
				screenOverlayVisibility.value = 'none';
				document.body.style.overflow = '';
			}
		}

		return {
			isAnyModalVisible,
			isAnyDialogVisible,
			screenOverlayVisibility,
		};
	},
});
</script>

<style scoped></style>
