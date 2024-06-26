<template>
	<div class="container mt-l">
		<div class="container-sm">
			<h3>Настройки профиля</h3>

			<div class="profile__avatar-block">
				<img
					:src="$store.state.user.photoUrl"
					alt="Profile picture"
					class="profile__avatar"
				/>
				<h2 class="profile__nickname">{{ $store.state.user.displayName }}</h2>
			</div>

			<section class="profile__block">
				<InputComponent
					:label="'Отображаемое имя'"
					:placeholder="$store.state.user.displayName"
					:inlineButton="true"
					:counter="32"
					@onChange="modifyInputData"
					@onConfirm="updateDisplayName"
				/>

				<div class="profile__text-block">
					<p class="profile__option-name">Аватар пользователя</p>
					<div class="profile__change-photo-block">
						<img
							:src="$store.state.user.photoUrl"
							alt="Profile picture"
							class="profile__change-photo-avatar"
						/>
						<p class="profile__option-desc">
							Для смены аватара пользователя, перейди в Управление аккаунтом
							Google - Личная информация, и поменяй фотографию пользователя там.
							Обновление займет какое-то время.
						</p>
					</div>
				</div>

				<div class="profile__delete-block">
					<div class="profile__text-block">
						<p class="profile__option-name">Удалить профиль</p>
						<p class="profile__option-desc">
							При удалении учетной записи, вся информация, включая электронную
							почту пользователя, аватар пользователя, а так же отображаемое имя
							будут удалены. Сборки все еще будут доступны, однако, автор сборки
							сменится на “Неизвестен”
						</p>
					</div>
					<button class="btn btn-secondary btn-m profile__btn">
						Удалить профиль
					</button>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';
import LowerPopUp from '@/components/error/LowerPopUp.vue';
import { useStore } from 'vuex';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import InputComponent from '@/components/ui/InputComponent.vue';

export default defineComponent({
	components: { WorkInProgress, LowerPopUp, InputComponent },
	setup() {
		const auth = getAuth();
		const store = useStore();

		const inputName: Ref<string | null> = ref(null);

		function modifyInputData(newValue: string) {
			inputName.value = newValue;
		}

		function updateDisplayName() {
			if (auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: inputName.value,
				})
					.then(async () => {
						// TODO: Отсылать во vuex сообщение об успешном смене имени
						store.commit('setNewDisplayName', inputName.value);
						// add data to DB
						if (auth.currentUser) {
							try {
								await setDoc(doc(db, 'users', auth.currentUser.uid), {
									displayName: inputName.value,
									photoURL: auth.currentUser.photoURL,
								});
							} catch (err: any) {
								console.log('Error adding document: ', err.message);
							}
						}
					})
					.catch((error) => {
						// TODO: Сообщение во vuex об ошибке при смене имени
						console.log(error);
					});
			}
		}

		return {
			auth,
			inputName,
			modifyInputData,
			updateDisplayName,
		};
	},
});
</script>
