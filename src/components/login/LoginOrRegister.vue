<template>
	<ModalComponent @closeModal="forceClose">
		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<button class="modal__google-btn btn">
			<IconBase
				:iconName="'Sign in with Google'"
				class="modal__google-icon"
				:width="32"
				:height="32"
				:viewBox="`0 0 32 32`"
			>
				<IconGoogle />
			</IconBase>
			<span class="modal__google-text">Войти при помощи Google</span>
		</button>

		<p class="modal__legal">
			Регистрируясь на сайте, Вы соглашаетесь с
			<router-link
				@click="closeModalAndNavigation"
				to="/user-agreement"
				class="modal__link"
				>пользовательским соглашением</router-link
			>
			и
			<router-link
				@click="closeModalAndNavigation"
				to="/privacy"
				class="modal__link"
				>политикой обработки персональных данных</router-link
			>.
		</p>
	</ModalComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconGoogle from '@/components/ui/icons/IconGoogle.vue';

export default defineComponent({
	components: { ModalComponent, IconBase, IconGoogle },
	setup() {
		const store = useStore();

		function forceClose() {
			store.commit('toggleLoginModalVisibility', true);
		}

		function closeModalAndNavigation() {
			store.commit('toggleLoginModalVisibility', true);
			store.commit('toggleNavigationVisibility', true);
		}

		return {
			forceClose,
			closeModalAndNavigation,
		};
	},
});
</script>
