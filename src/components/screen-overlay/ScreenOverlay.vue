<template>
	<div
		class="visible-screen"
		id="visible-screen-40"
		v-if="isAnyModalVisible || isAnyDialogVisible"
	></div>
	<div class="screen-bottom" id="screen-bottom">
		<PopUpHandler />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
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

		watch(
			() => isAnyModalVisible.value,
			(visible) => {
				if (visible) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			}
		);

		watch(
			() => isAnyDialogVisible.value,
			(visible) => {
				if (visible) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			}
		);

		return {
			isAnyModalVisible,
			isAnyDialogVisible,
		};
	},
});
</script>

<style scoped></style>
