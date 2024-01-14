<template>
	<div class="login__page-mask" @click.self="closePopup">
		<div class="login__popup">
			<h2>Войти</h2>
			<p class="login__error-msg" v-if="errorMsg">{{ errorMsg }}</p>
			<div class="login__input-block">
				<div class="login__input-item">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" />
				</div>
				<div class="login__input-item">
					<label for="password">Пароль</label>
					<input type="password" name="password" id="password" />
				</div>
			</div>
			<button class="btn btn-small btn-wide">Войти</button>
			<div class="login__or-text">
				<span>&nbsp;</span>
				<p>Или</p>
				<span>&nbsp;</span>
			</div>
			<button class="btn btn-small btn-wide">Войти с помощью Google</button>
			<div class="login__no-account">
				<p>Нет учетной записи?</p>
				<a href="#">Зарегистрироваться</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup(props, context) {
		let errorMsg = ref('');

		function closePopup() {
			context.emit('closePopup');
		}

		return { errorMsg, closePopup };
	},
});
</script>
