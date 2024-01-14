<template>
	<header class="header">
		<nav class="container header__container">
			<div class="header__left">
				<ul class="header__links-list">
					<li>
						<router-link to="/" class="header__link"
							><i class="fa-solid fa-angles-up"></i
							>&nbsp;&nbsp;Таблица</router-link
						>
					</li>
					<li>
						<router-link to="/calculator" class="header__link"
							><i class="fa-solid fa-user-gear"></i
							>&nbsp;&nbsp;Калькулятор</router-link
						>
					</li>
					<li v-if="false">
						<router-link to="/skill-builds" class="header__link"
							><i class="fa-solid fa-book-open"></i
							>&nbsp;&nbsp;Сборки</router-link
						>
					</li>
					<li>
						<router-link to="/events" class="header__link"
							><i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;Календарь
							событий</router-link
						>
					</li>
				</ul>
			</div>
			<login-block v-if="false"></login-block>
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
