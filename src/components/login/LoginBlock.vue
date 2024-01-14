<template>
	<!-- if NOT logged in -->
	<div class="header__right">
		<div class="header__user-block" @click="openLoginPopup">
			<p class="header__user-nickname">Войти</p>
			<i class="fa-regular fa-user"></i>
		</div>
	</div>
	<!-- if logged in -->
	<div class="header__right" v-if="false">
		<div class="header__user-block">
			<p class="header__user-nickname">Nickname</p>
			<i class="fa-regular fa-user"></i>
		</div>
		<div class="header__profile-popup">
			<ul class="header__profile-popup-block">
				<li class="header__profile-link">Мои сборки</li>
			</ul>
			<ul class="header__profile-popup-block">
				<li class="header__profile-link">Настройки профиля</li>
				<li class="header__profile-link">Выйти</li>
			</ul>
		</div>
	</div>

	<Teleport to="body">
		<login-popup v-if="isLoginPopup" @closePopup="closePopup"></login-popup>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import LoginPopup from '@/components/login/LoginPopup.vue';

export default defineComponent({
	components: { LoginPopup },
	setup() {
		const isLoginPopup: Ref<boolean> = ref(false);

		function openLoginPopup() {
			isLoginPopup.value = !isLoginPopup.value;
		}

		function closePopup() {
			isLoginPopup.value = !isLoginPopup.value;
		}

		return { isLoginPopup, openLoginPopup, closePopup };
	},
});
</script>
