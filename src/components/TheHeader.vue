<template>
	<header class="header">
		<nav class="container header__container">
			<div class="header__left">
				<ul class="header__links-list">
					<li>
						<router-link :to="{ name: 'Home' }" class="header__link">
							<i class="fa-solid fa-angles-up"></i>
							<span>Таблица</span>
						</router-link>
					</li>
					<li>
						<router-link to="/calculator" class="header__link">
							<i class="fa-solid fa-user-gear"></i>
							<span>Калькулятор</span>
						</router-link>
					</li>
					<li>
						<router-link to="/skill-builds" class="header__link">
							<i class="fa-solid fa-book-open"></i>
							<span>Сборки</span>
						</router-link>
					</li>
					<li>
						<router-link to="/events" class="header__link">
							<i class="fa-regular fa-calendar"></i>
							<span>Календарь событий</span>
						</router-link>
					</li>
				</ul>
			</div>
			<login-block v-if="$store.state.inDevelop"></login-block>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginBlock from '@/components/login/LoginBlock.vue';

export default defineComponent({
	components: { LoginBlock },
	setup() {},
});
</script>
