<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="forceClose"></div>
		<section class="modal">
			<button class="btn btn-tertiary btn-sm">x</button>
			<h3 class="modal__title">Войти</h3>
			<!-- google btn -->
			<div class="">Кнопка</div>
			<p class="modal__legal">
				Регистрируясь на сайте, Вы соглашаетесь с
				<router-link to="/user-agreement" class="modal__link"
					>пользовательским соглашением</router-link
				>
				и
				<router-link to="/privacy" class="modal__link"
					>политикой обработки персональных данных</router-link
				>.
			</p>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	setup() {
		const store = useStore();

		function forceClose() {
			store.commit('toggleLoginModalVisibility', true);
		}

		return {
			forceClose,
		};
	},
});
</script>
