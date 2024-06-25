<template>
	<ModalComponent :modalName="'isLoginModalVisible'">
		<h3 class="modal__title">Войти или зарегистрироваться</h3>

		<button class="modal__google-btn btn" @click="signInWithGoogle">
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
import { defineComponent, ref, Ref } from 'vue';
import { useStore } from 'vuex';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconGoogle from '@/components/ui/icons/IconGoogle.vue';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { checkIfUserAnAdmin } from './functions/checkIfUserAnAdmin';

export default defineComponent({
	components: { ModalComponent, IconBase, IconGoogle },
	setup() {
		const store = useStore();

		function closeModalAndNavigation() {
			store.commit('toggleModalVisibility', {
				name: 'isLoginModalVisible',
				forceClose: true,
			});
			store.commit('toggleNavigationVisibility', true);
		}

		// Регистрация / Логин
		const isUserAnAdmin: Ref<boolean> = ref(false);

		// TODO: сделать popup окна либо с успешным "вы вошли в аккаунт"
		// либо с ошибкой
		function signInWithGoogle() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider)
				.then((result) => {
					console.log('Авторизация прошла удачно!');
					console.log(getAuth().currentUser);

					const auth = getAuth();
					isUserAnAdmin.value = checkIfUserAnAdmin();
					if (auth.currentUser) {
						setUserDataInStore({
							isLoggedIn: true,
							uid: auth.currentUser.uid,
							displayName: auth.currentUser.displayName,
							photoUrl: auth.currentUser.photoURL,
							isAdmin: isUserAnAdmin.value,
						});
					}
				})
				.catch((error) => {
					console.log(error.code);
					alert(error.message);
				})
				.finally(() => {
					closeModalAndNavigation();
				});
		}

		function setUserDataInStore(payload: {
			isLoggedIn: boolean;
			uid: string | null;
			displayName: string | null;
			photoUrl: string | null;
			isAdmin: boolean;
		}) {
			store.commit('setUserData', payload);
		}

		return {
			closeModalAndNavigation,
			signInWithGoogle,
		};
	},
});
</script>
