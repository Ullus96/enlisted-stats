<template>
	<div class="login__page-mask">
		<login
			v-if="isLoginPopup"
			@switchToRegistration="isLoginPopup = false"
			@loginCompleted="closePopup"
			@closePopup="closePopup"
		></login>
		<register
			v-else
			@switchToLogin="isLoginPopup = true"
			@registerCompleted="closePopup"
			@closePopup="closePopup"
		></register>
		<!-- TODO: Error block on successfuly login or register -->
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
