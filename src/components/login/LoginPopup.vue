<template>
	<div class="login__page-mask" @click.self="closePopup">
		<login
			v-if="isLoginPopup"
			@switchToRegistration="isLoginPopup = false"
		></login>
		<register v-else @switchToLogin="isLoginPopup = true"></register>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';

export default defineComponent({
	components: { Login, Register },

	setup(props, context) {
		function closePopup() {
			context.emit('closePopup');
		}

		const isLoginPopup = ref(true);

		return { closePopup, isLoginPopup };
	},
});
</script>
