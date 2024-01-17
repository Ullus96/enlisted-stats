<template>
	<div class="login__popup">
		<button class="btn login__close-btn" @click="closePopup">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<h2>Войти</h2>
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
					autocomplete="password"
				/>
			</div>
		</div>
		<button class="btn btn-small btn-wide" @click="login">Войти</button>
		<div class="login__or-text">
			<span></span>
			<p>Или</p>
			<span></span>
		</div>
		<button class="btn btn-small btn-wide" @click="signInWithGoogle">
			Войти с помощью Google
		</button>
		<div class="login__switch-states">
			<p>Нет учетной записи?</p>
			<a href="#" @click.prevent="switchToRegistration">Зарегистрироваться</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';

export default defineComponent({
	setup(props, context) {
		const email: Ref<string> = ref('');
		const password: Ref<string> = ref('');
		const errorMsg: Ref<string> = ref('');

		function login() {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, email.value, password.value)
				.then((data) => {
					console.log('Авторизация прошла удачно!');
					console.log(auth.currentUser);
					context.emit('loginCompleted');
				})
				.catch((error) => {
					console.log(error.code);
					switch (error.code) {
						case 'auth/invalid-email':
							errorMsg.value = 'Почта введена неверно';
							break;
						case 'auth/user-not-found':
							errorMsg.value = 'Пользователь с такой почтой не найден';
							break;
						case 'auth/wrong-password':
							errorMsg.value = 'Неверный пароль';
							break;
						default:
							errorMsg.value = 'Почта или пароль введены неверно';
							break;
					}
				});
		}

		function signInWithGoogle() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider)
				.then((result) => {
					console.log('Авторизация прошла удачно!');
					console.log(getAuth().currentUser);
					context.emit('loginCompleted');
				})
				.catch((error) => {
					console.log(error.code);
					alert(error.message);
				});
		}

		function switchToRegistration() {
			context.emit('switchToRegistration');
		}

		function closePopup() {
			context.emit('closePopup');
		}

		return {
			errorMsg,
			switchToRegistration,
			closePopup,
			email,
			password,
			login,
			signInWithGoogle,
		};
	},
});
</script>
