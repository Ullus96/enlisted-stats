<template>
	<ModalComponent :modalName="'isLoginModalVisible'">
		<template #title> Войти или зарегистрироваться </template>

		<button class="modal__google-btn btn" @click="signInWithGoogle">
			<svg
				class="modal__google-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 32 32"
				role="presentation"
			>
				<g>
					<IconGoogle />
				</g>
			</svg>
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
import { useStore } from '@/store/useStore';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconGoogle from '@/components/ui/icon/icons/IconGoogle.vue';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { checkIfUserAnAdmin } from './functions/checkIfUserAnAdmin';
import { createPopUp } from '@/components/popup/utils';
import {
	POPUP_LOGIN_SUCCESS,
	POPUP_LOGIN_ERROR,
} from '@/components/popup/data';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default defineComponent({
	components: { ModalComponent, IconBase, IconGoogle },
	setup() {
		const md5 = require('md5') as (input: string) => string;
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

		function signInWithGoogle() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider)
				.then(async () => {
					createPopUp(store, POPUP_LOGIN_SUCCESS);

					const auth = getAuth();
					isUserAnAdmin.value = checkIfUserAnAdmin();
					if (!auth.currentUser) return;

					const user = auth.currentUser;
					const userRef = doc(db, 'users', user.uid);
					const userSnap = await getDoc(userRef);

					type UserData = {
						displayName?: string;
						photoURL?: string;
						avatarProvider?: 'google' | 'gravatar' | 'none';
						emailHash?: string;
					};

					let userData: UserData = userSnap.exists()
						? (userSnap.data() as UserData)
						: {};

					const displayName =
						userData.displayName || user.displayName || user.uid;
					const photoURL = userData.photoURL || user.photoURL || null;
					const avatarProvider = userData.avatarProvider || 'google';
					const emailHash =
						userData.emailHash || (user.email ? md5(user.email) : null);

					if (
						!userSnap.exists() ||
						!userData.displayName ||
						!userData.photoURL ||
						!userData.avatarProvider ||
						!userData.emailHash
					) {
						try {
							await setDoc(
								userRef,
								{
									displayName,
									photoURL,
									avatarProvider,
									emailHash,
								},
								{ merge: true }
							);
						} catch (err: any) {
							console.log('Error updating user document:', err.message);
						}

						setUserDataInStore({
							isLoggedIn: true,
							uid: auth.currentUser.uid,
							displayName: auth.currentUser.displayName,
							photoUrl: auth.currentUser.photoURL,
							isAdmin: isUserAnAdmin.value,
							avatarProvider: avatarProvider,
							emailHash: emailHash,
						});
					}
				})
				.catch((error) => {
					createPopUp(store, POPUP_LOGIN_ERROR);
					console.log(error.code);
					console.log(error.message);
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
			avatarProvider: 'google' | 'gravatar' | 'none' | null;
			emailHash: string | null;
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
