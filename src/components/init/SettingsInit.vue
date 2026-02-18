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
		let eventCardWidth: Ref<number> = ref(1);
		let showTutorial: Ref<boolean> = ref(true);

		onMounted(() => {
			compactMode.value = loadFromLocalStorage('compactMode');
			console.log(`compactMode.value: ${compactMode.value}`);
			store.commit('switchCompactMode', compactMode.value);

			showTutorial.value = loadFromLocalStorage('showTutorial');
			console.log(`showTutorial.value: ${showTutorial.value}`);
			store.commit('switchTutorialVisibility', showTutorial.value);

			eventCardWidth.value = loadFromLocalStorage('eventCardWidth') || 1;
			store.commit('setEventCardWidth', eventCardWidth.value);
			updateRootVariable('--ui-card-width', `${eventCardWidth.value * 10}rem`);

			// console.log(
			// 	`settingsInit finished initializing. compactMode data: ${compactMode.value}`
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
