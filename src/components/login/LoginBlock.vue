<template>
	<!-- if NOT logged in -->
	<div class="header__right" v-if="!isLoggedIn">
		<div class="header__user-block" @click="openLoginPopup">
			<p class="header__user-nickname">Войти</p>
			<i class="fa-regular fa-user"></i>
		</div>
	</div>
	<!-- if logged in -->
	<div class="header__right" v-if="isLoggedIn">
		<div class="header__user-block" @click="showMenu = true">
			<!-- <p class="header__user-nickname" v-if="auth?.currentUser?.displayName">
				{{ auth.currentUser.displayName }}
			</p>
			<p class="header__user-nickname" v-else>Профиль</p> -->
			<img
				:src="auth.currentUser.photoURL"
				alt="Profile Photo"
				class="header__user-img"
				v-if="auth?.currentUser?.photoURL"
			/>
			<i class="fa-regular fa-user" v-else></i>
		</div>
		<div class="header__profile-popup" v-if="showMenu">
			<div class="header__profile-popup-block">
				<div class="header__profile-data-block">
					<img
						:src="auth.currentUser.photoURL"
						alt="Profile Photo"
						class="header__profile-user-img"
						v-if="auth?.currentUser?.photoURL"
					/>
					<p
						class="header__user-nickname"
						v-if="auth?.currentUser?.displayName"
					>
						{{ auth.currentUser.displayName }}
					</p>
				</div>

				<div class="header__breakline"></div>

				<div class="header__profile-link">
					<i class="fa-solid fa-book-open"></i>
					<p>Мои сборки</p>
				</div>
				<div class="header__profile-link">
					<i class="fa-solid fa-heart"></i>
					<p>Сохраненные</p>
				</div>

				<div class="header__breakline"></div>

				<div class="header__profile-link">
					<i class="fa-solid fa-gear"></i>
					<p>Профиль</p>
				</div>
				<div class="header__profile-link" @click="handleSignOut">
					<i class="fa-solid fa-arrow-right-from-bracket"></i>
					<p>Выйти</p>
				</div>
			</div>
		</div>
	</div>

	<Teleport to="body">
		<login-popup
			v-if="store.state.showLoginPopup"
			@closePopup="closePopup"
		></login-popup>
		<div class="page-mask" v-if="showMenu" @click="showMenu = false"></div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LoginPopup from '@/components/login/LoginPopup.vue';
import { useStore } from 'vuex';

export default defineComponent({
	components: { LoginPopup },
	setup() {
		const store = useStore();
		const isLoginPopup: Ref<boolean> = ref(false);

		const isLoggedIn: Ref<boolean> = ref(false);

		let auth;
		onMounted(() => {
			auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					isLoggedIn.value = true;
				} else {
					isLoggedIn.value = false;
				}
			});
		});
		auth = getAuth();

		function openLoginPopup() {
			// isLoginPopup.value = !isLoginPopup.value;
			store.commit('showLoginPopup');
		}

		function closePopup() {
			// isLoginPopup.value = !isLoginPopup.value;
			store.commit('closeLoginPopup');
			console.log('closeLoginPopup on LoginBlock.vue');
			console.log(store.state.showLoginPopup);
		}

		function handleSignOut() {
			signOut(getAuth());
			closeMenu();
		}

		const showMenu: Ref<boolean> = ref(false);
		function closeMenu() {
			showMenu.value = false;
		}

		return {
			isLoginPopup,
			openLoginPopup,
			closePopup,
			isLoggedIn,
			handleSignOut,
			auth,
			showMenu,
			store,
		};
	},
});
</script>
