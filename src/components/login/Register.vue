<template>
	<div class="login__popup">
		<button class="btn login__close-btn" @click="closePopup">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<h2>Зарегистрироваться</h2>
		<p class="login__error-msg" v-if="errorMsg">{{ errorMsg }}</p>
		<div class="login__input-block">
			<div class="login__input-item">
				<label for="email">Email</label>
				<input type="email" v-model="email" id="email" autocomplete="email" />
			</div>
			<div class="login__input-item">
				<label for="password">Пароль</label>
				<input
					type="password"
					v-model="password"
					id="password"
					autocomplete="new-password"
				/>
			</div>
			<div class="login__input-item">
				<label for="password-2">Повторите пароль</label>
				<input
					type="password"
					v-model="password2"
					id="password-2"
					autocomplete="new-password"
				/>
			</div>
		</div>
		<button class="btn btn-small btn-wide" @click="register">
			Зарегистрироваться
		</button>
		<div class="login__or-text">
			<span></span>
			<p>Или</p>
			<span></span>
		</div>
		<button class="btn btn-small btn-wide" @click="signInWithGoogle">
			Войти с помощью Google
		</button>
		<div class="login__switch-states">
			<p>Есть учетная записи?</p>
			<a href="#" @click.prevent="switchToLogin">Войти</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

export default defineComponent({
	setup(props, context) {
		const errorMsg = ref('');

		const email: Ref<string> = ref('');
		const password: Ref<string> = ref('');
		const password2: Ref<string> = ref('');

		function register() {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, email.value, password.value)
				.then((data) => {
					console.log('Регистрация прошла удачно!');
					console.log(auth.currentUser);
					context.emit('registerCompleted');
				})
				.catch((error) => {
					console.log(error.code);
					alert(error.message);
				});
		}
		function signInWithGoogle() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider)
				.then((result) => {
					console.log('Регистрация прошла удачно!');
					console.log(getAuth().currentUser);
					context.emit('registerCompleted');
				})
				.catch((error) => {
					console.log(error.code);
					alert(error.message);
				});
		}

		function switchToLogin() {
			context.emit('switchToLogin');
		}

		function closePopup() {
			context.emit('closePopup');
		}

		return {
			errorMsg,
			switchToLogin,
			closePopup,
			email,
			password,
			password2,
			register,
			signInWithGoogle,
		};
	},
});
</script>
