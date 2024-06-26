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
					<button
						class="btn btn-secondary btn-m profile__btn"
						@click="$store.state.dialog.isDeletingAccount = true"
					>
						Удалить профиль
					</button>
				</div>
			</section>
		</div>
	</div>

	<DialogComponent
		:dialogName="'isDeletingAccount'"
		v-if="$store.state.dialog.isDeletingAccount"
		:yes="{ text: 'Удалить', type: 'tertiary' }"
		:no="{ text: 'Отмена', type: 'primary' }"
		@confirm="deleteAccountTest"
	>
		<h3 class="dialog__title">Удалить учетную запись?</h3>
		<p class="dialog__desc">
			Это действие необратимо. Возможности восстановить учетную запись, а так же
			все сохраненные сборки - не будет.
		</p>
	</DialogComponent>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { deleteUser, getAuth, updateProfile } from 'firebase/auth';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';
import LowerPopUp from '@/components/error/LowerPopUp.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import InputComponent from '@/components/ui/InputComponent.vue';
import DialogComponent from '@/components/ui/DialogComponent.vue';

export default defineComponent({
	components: { WorkInProgress, LowerPopUp, InputComponent, DialogComponent },
	setup() {
		const auth = getAuth();
		const user = auth.currentUser;
		const store = useStore();
		const router = useRouter();

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

		// Удаление

		function deleteAccountTest() {
			console.log('Account deleted');
			// тут твоя функция deleteAccount
		}

		function deleteAccount() {
			if (!user) return;

			deleteUser(user)
				.then(() => {
					// User deleted.
					const docRef = doc(db, 'users', user.uid);

					try {
						deleteDoc(docRef);
						// TODO: сделать оповещение во vuex что профиль удален
						router.push('/');
					} catch (err: any) {
						// TODO: ту же ошибку что и ниже
						alert(`Произошла ошибка: ${err.message}`);
					}
				})
				.catch((error) => {
					// TODO: Сообщение во vuex об ошибке удаления
					// и типа свяжитесь с администратором напрямую
					// через кнопку "Контакты" в боковом меню
				});
		}

		return {
			auth,
			inputName,
			modifyInputData,
			updateDisplayName,
			deleteAccountTest,
		};
	},
});
</script>
