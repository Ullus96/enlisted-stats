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
			compactMode.value = loadFromLocalStorage('compactMode') ?? true;
			store.commit('switchCompactMode', compactMode.value);

			showTutorial.value = loadFromLocalStorage('showTutorial') ?? true;
			store.commit('switchTutorialVisibility', showTutorial.value);

			eventCardWidth.value = loadFromLocalStorage('eventCardWidth') || 1;
			store.commit('setEventCardWidth', eventCardWidth.value);
			updateRootVariable('--ui-card-width', `${eventCardWidth.value * 10}rem`);
		});
	},
});
</script>
