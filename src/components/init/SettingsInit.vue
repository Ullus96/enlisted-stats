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

		onMounted(() => {
			compactMode.value = loadFromLocalStorage('compactMode') || false;
			store.commit('switchCompactMode', compactMode.value);
			console.log(
				`settingsInit finished initializing. compactMode data: ${compactMode.value}`
			);
		});
	},
});
</script>
