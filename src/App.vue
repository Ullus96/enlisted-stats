<template>
	<div class="page-wrapper" id="page">
		<ScreenOverlay />

		<auth-init></auth-init>
		<settings-init></settings-init>
		<!-- <vuex-debug></vuex-debug> -->
		<the-aside></the-aside>
		<main class="main">
			<router-view v-slot="{ Component }">
				<transition name="route" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<script lang="ts">
import TheAside from './components/TheAside.vue';
import AuthInit from './components/auth/AuthInit.vue';
import SettingsInit from './components/init/SettingsInit.vue';
import VuexDebug from './components/debug/VuexDebug.vue';
import { defineComponent } from 'vue';
import ScreenOverlay from './components/screen-overlay/ScreenOverlay.vue';

export default defineComponent({
	name: 'App',
	components: {
		TheAside,
		AuthInit,
		SettingsInit,
		VuexDebug,
		ScreenOverlay,
	},
	setup() {
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

			const link = target.closest('a') as HTMLAnchorElement | null;

			if (link) {
				link.blur();
			}
		});

		return {};
	},
});
</script>

<style scoped>
.route-enter-to,
.route-leave-from {
	transition: 0.5s ease-out transform, 0.2s ease-in-out opacity;
	opacity: 1;
	transform: translateY(0);
}

.route-enter-from,
.route-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>
