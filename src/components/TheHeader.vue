<template>
	<header class="header">
		<nav class="container header__container">
			<div class="header__left">
				<ul class="header__links-list">
					<li><router-link to="/" class="header__link">Бойцы</router-link></li>
					<li>
						<router-link to="/events" class="header__link"
							>Календарь событий</router-link
						>
					</li>
					<li>
						<router-link to="/calculator" class="header__link"
							>Калькулятор</router-link
						>
					</li>
				</ul>
			</div>
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
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {},
});
</script>
