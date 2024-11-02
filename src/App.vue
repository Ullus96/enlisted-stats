<template>
	<div class="visible-screen" id="visible-screen" v-if="false"></div>
	<div
		class="visible-screen"
		id="visible-screen-40"
		v-if="isAnyModalVisible || isAnyDialogVisible"
	></div>
	<div class="screen-bottom" id="screen-bottom">
		<PopUpHandler />
	</div>
	<div class="page-wrapper" id="page">
		<auth-init></auth-init>
		<settings-init></settings-init>
		<!-- <vuex-debug></vuex-debug> -->
		<the-aside></the-aside>
		<main class="main">
			<router-view></router-view>
		</main>
	</div>
</template>

<script lang="ts">
import TheAside from './components/TheAside.vue';
import AuthInit from './components/auth/AuthInit.vue';
import SettingsInit from './components/init/SettingsInit.vue';
import VuexDebug from './components/debug/VuexDebug.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import PopUpHandler from './components/popup/PopUpHandler.vue';

export default defineComponent({
	name: 'App',
	components: {
		TheAside,
		AuthInit,
		SettingsInit,
		VuexDebug,
		PopUpHandler,
	},
	setup() {
		const store = useStore();

		// Computed свойство для проверки, если любой modal видим
		const isAnyModalVisible = computed(() => {
			return Object.values(store.state.modal).some((value) => value);
		});

		const isAnyDialogVisible = computed(() => {
			return Object.values(store.state.dialog).some((value) => value);
		});

		// Убираем фокус кнопки при клике
		document.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;

			// проверяем, если целевой элемент сам кнопка, или внутри кнопки
			const button = target.closest(
				'button, [type="button"]'
			) as HTMLButtonElement | null;

			if (button) {
				button.blur();
			}
		});

		return {
			isAnyModalVisible,
			isAnyDialogVisible,
		};
	},
});
</script>
