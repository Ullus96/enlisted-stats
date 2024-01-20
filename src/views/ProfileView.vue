<template>
	<div class="container-sm mt-s">
		<div class="profile__header">
			<!-- if pfp -->
			<img
				:src="auth.currentUser?.photoURL"
				alt="Profile Picture"
				v-if="auth.currentUser?.photoURL"
				class="profile__header-img"
			/>
			<!-- else if no pfp -->
			<div class="profile__header-img profile__header-img--blank" v-else>
				<i class="fa-regular fa-user"></i>
			</div>

			<h1 class="profile__header-title" v-if="!newName">
				{{
					auth.currentUser?.displayName
						? auth.currentUser?.displayName
						: 'Пользователь'
				}}
			</h1>
			<h1 class="profile__header-title" v-else>
				{{ newName }}
			</h1>
		</div>

		<div class="profile__body">
			<div class="profile__input-block">
				<label for="displayName">Отображаемое имя</label>
				<div class="profile__input-flex">
					<input
						type="text"
						class="input profile__input-input"
						id="displayName"
						:placeholder="nameOnFirstLoad"
						v-model="newName"
						@keypress="keysPressedCounter++"
						:class="{ 'btn-error': errorMsg }"
					/>
					<button class="btn profile__input-btn" :disabled="isBtnDisabled">
						<i class="fa-solid fa-check"></i>
					</button>
				</div>
				<div class="profile__input-lower-info">
					<p class="profile__input-error">
						{{ errorMsg }}
					</p>
					<p class="profile__input-counter">
						{{ newName.split('').length }}/32
					</p>
				</div>
			</div>

			<div class="profile__no-img">
				<p class="profile__no-img-title">Аватар пользователя</p>
				<div class="profile__no-img-inner">
					<!-- if pfp -->
					<img
						:src="auth.currentUser?.photoURL"
						alt="Profile Picture"
						v-if="auth.currentUser?.photoURL"
						class="profile__no-img--img"
					/>
					<!-- else if no pfp -->
					<div class="profile__no-img--img profile__header-img--blank" v-else>
						<i class="fa-regular fa-user"></i>
					</div>
					<p class="profile__no-img-desc">
						Для смены аватара пользователя, перейдите в Управление аккаунтом
						Google - Личная информация, и поменяйте фотографию пользователя там.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { getAuth } from 'firebase/auth';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';

export default defineComponent({
	components: { WorkInProgress },
	setup() {
		const auth = getAuth();
		const nameOnFirstLoad = auth.currentUser?.displayName || 'Имя пользователя';
		const newName: Ref<string> = ref('');
		const keysPressedCounter: Ref<number> = ref(0);

		let errorMsg = computed(() => {
			if (!newName.value && keysPressedCounter.value > 0) {
				return 'Не может быть пустым';
			}
		});

		let isBtnDisabled = computed(() => {
			if (keysPressedCounter.value == 0) {
				return true;
			}
			return !!errorMsg.value;
		});

		return {
			auth,
			nameOnFirstLoad,
			newName,
			errorMsg,
			keysPressedCounter,
			isBtnDisabled,
		};
	},
});
</script>
