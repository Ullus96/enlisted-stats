<template></template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useStore } from '@/store/useStore';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';
import {
	TRootVariables,
	updateRootVariable,
	getRootVariable,
} from '@/functions/rootVariables';

export default defineComponent({
	setup() {
		const store = useStore();

		let compactMode: Ref<boolean> = ref(true);
		let inlineRewards: Ref<boolean> = ref(false);
		let eventCardWidth: Ref<number> = ref(1);

		onMounted(() => {
			compactMode.value = loadFromLocalStorage('compactMode') || true;
			store.commit('switchCompactMode', compactMode.value);

			inlineRewards.value = loadFromLocalStorage('inlineRewards') || false;
			store.commit('switchInlineRewards', compactMode.value);

			eventCardWidth.value = loadFromLocalStorage('eventCardWidth') || 1;
			store.commit('setEventCardWidth', eventCardWidth.value);
			updateRootVariable('--ui-card-width', `${eventCardWidth.value * 10}rem`);

			// console.log(
			// 	`settingsInit finished initializing. compactMode data: ${compactMode.value}`
			// );
			// console.log(
			// 	`settingsInit finished initializing. inlineRewards data: ${inlineRewards.value}`
			// );
			// console.log(
			// 	`settingsInit finished initializing. eventCardWidth data: ${
			// 		eventCardWidth.value
			// 	} | ${eventCardWidth.value * 10}rem`
			// );
		});
	},
});
</script>
