<template>
	<div class="login__popup">
		<h2>Зарегистрироваться</h2>
		<p class="login__error-msg" v-if="errorMsg">{{ errorMsg }}</p>
		<div class="login__input-block">
			<div class="login__input-item">
				<label for="email">Email</label>
				<input type="email" id="email" />
			</div>
			<div class="login__input-item">
				<label for="password">Пароль</label>
				<input type="password" id="password" />
			</div>
			<div class="login__input-item">
				<label for="password-2">Повторите пароль</label>
				<input type="password" id="password-2" />
			</div>
		</div>
		<button class="btn btn-small btn-wide">Зарегистрироваться</button>
		<div class="login__or-text">
			<span></span>
			<p>Или</p>
			<span></span>
		</div>
		<button class="btn btn-small btn-wide">Регистрация с помощью Google</button>
		<div class="login__switch-states">
			<p>Есть учетная записи?</p>
			<a href="#" @click.prevent="switchToLogin">Войти</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup(props, context) {
		const errorMsg = ref('');

		function switchToLogin() {
			context.emit('switchToLogin');
		}

		return { errorMsg, switchToLogin };
	},
});
</script>
