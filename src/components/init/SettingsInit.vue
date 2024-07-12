<template></template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useStore } from 'vuex';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';

export default defineComponent({
	setup() {
		const store = useStore();

		let compactMode: Ref<boolean> = ref(false);
		let inlineRewards: Ref<boolean> = ref(false);

		onMounted(() => {
			compactMode.value = loadFromLocalStorage('compactMode') || false;
			inlineRewards.value = loadFromLocalStorage('inlineRewards') || false;
			store.commit('switchCompactMode', compactMode.value);
			store.commit('switchInlineRewards', compactMode.value);
			console.log(
				`settingsInit finished initializing. compactMode data: ${compactMode.value}`
			);
			console.log(
				`settingsInit finished initializing. inlineRewards data: ${inlineRewards.value}`
			);
		});
	},
});
</script>
