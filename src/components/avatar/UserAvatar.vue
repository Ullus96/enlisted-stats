<template>
	<div>
		<img src="@/assets/avatar-skeleton.svg" alt="" />
		<!-- <img :src="getGravatarUrl(user.email)" alt="avatar" />" -->
		{{ store.state.user.photoUrl }}
		<button class="btn btn-secondary" @click="changeURL">Change URL</button>
		<button class="btn btn-secondary" @click="createHash('sometext')">
			Create Hash
		</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/useStore';

export default defineComponent({
	props: {
		imgSize: {
			required: false,
			default: 50,
			type: Number,
		},
	},
	setup(props) {
		const md5 = require('md5') as (input: string) => string;
		const store = computed(() => useStore());

		function createHash(email: string) {
			email = email.trim().toLowerCase();
			const hash = md5(email);

			console.log(hash);
			return hash;
		}

		function changeURL() {
			store.value.commit('setUserData', {
				...store.value.state.user,
				photoUrl: `https://www.gravatar.com/avatar/${createHash(
					'somemail'
				)}?s=${props.imgSize}&d=identicon`,
			});
		}

		function getGravatarUrl() {}

		return { store, changeURL, createHash };
	},
});
</script>

<style scoped></style>
