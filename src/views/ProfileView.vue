<template>
	<!-- loading skeleton -->
	<!-- <template v-if="pageLoading">
		<div class="container-sm mt-s">
			<div class="profile__header">
				<div class="profile__header-img loading">&nbsp;</div>

				<h1 class="profile__header-title loading">&nbsp;</h1>
			</div>

			<div class="profile__body loading">
				<div class="profile__input-block">
					<div class="profile__input-loading profile__input-loading--sm">
						&nbsp;
					</div>
					<div class="profile__input-loading">&nbsp;</div>
				</div>

				<div class="profile__input-block">
					<div class="profile__input-loading profile__input-loading--sm">
						&nbsp;
					</div>
					<div class="profile__input-loading">&nbsp;</div>
				</div>
			</div>
		</div>
	</template> -->

	<!-- actual content -->
	<!-- <template v-else>
		<div class="container-sm mt-s">
			<div class="profile__header"> -->
	<!-- if pfp -->
	<!-- <img
					:src="auth.currentUser?.photoURL"
					alt="Profile Picture"
					v-if="auth.currentUser?.photoURL"
					class="profile__header-img"
				/> -->
	<!-- else if no pfp -->
	<!-- <div class="profile__header-img profile__header-img--blank" v-else>
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
							maxlength="32"
							:placeholder="nameOnFirstLoad"
							v-model="newName"
							@keypress="keysPressedCounter++"
							:class="{ 'btn-error': errorMsg }"
						/>
						<button
							class="btn profile__input-btn"
							:disabled="isBtnDisabled"
							@click="updateDisplayName"
						>
							<i class="fa-solid fa-check"></i>
						</button>
					</div>
					<div class="profile__input-lower-info--inline-btn">
						<p class="profile__input-error">
							{{ errorMsg }}
						</p>
						<p class="profile__input-counter">
							{{ newName.split('').length }}/32
						</p>
					</div>
				</div> -->

	<!-- ------------------------- -->
	<!-- BLOCK FOR TESTING PURPOSE -->
	<!-- ------------------------- -->
	<!-- <template v-if="false">
					<div class="profile__input-block">
						<label for="getID">Имя пользователя по ID</label>
						<div class="profile__input-flex">
							<input
								type="text"
								class="input profile__input-input"
								id="getID"
								v-model="newID"
							/>
							<button class="btn profile__input-btn" @click="getUserByID">
								<i class="fa-solid fa-check"></i>
							</button>
						</div>
						<div class="profile__input-lower-info" v-if="loadedUserData">
							<img :src="loadedUserData.photoURL" alt="" />
							<p>{{ loadedUserData.displayName }}</p>
						</div>
					</div>
				</template> -->
	<!-- ------------------------- -->
	<!-- ------------------------- -->

	<!-- <div class="profile__no-img">
					<p class="profile__no-img-title">Аватар пользователя</p>
					<div class="profile__no-img-inner"> -->
	<!-- if pfp -->
	<!-- <img
							:src="auth.currentUser?.photoURL"
							alt="Profile Picture"
							v-if="auth.currentUser?.photoURL"
							class="profile__no-img--img"
						/> -->
	<!-- else if no pfp -->
	<!-- <div class="profile__no-img--img profile__header-img--blank" v-else>
							<i class="fa-regular fa-user"></i>
						</div>
						<p class="profile__no-img-desc">
							Для смены аватара пользователя, перейдите в Управление аккаунтом
							Google - Личная информация, и поменяйте фотографию пользователя
							там.
						</p>
					</div>
				</div>
			</div>
		</div>
	</template>
	<Teleport to="body">
		<lower-pop-up
			:title="popUpMsg.title"
			:type="popUpMsg.type"
			v-if="popUpMsg.title"
		>
			{{ popUpMsg.desc }}
		</lower-pop-up>
	</Teleport> -->

	<div class="container mt-l">
		<div class="container-sm">
			<h3>Настройки профиля</h3>

			<div class="profile__avatar-block">
				<img
					src="https://i.imgur.com/T39kQkM.jpeg"
					alt="Profile picture"
					class="profile__avatar"
				/>
				<h2 class="profile__nickname">zxcvenorez</h2>
			</div>

			<section class="profile__block">
				inputData: {{ inputData }}
				<InputComponent
					:label="'Отображаемое имя'"
					:placeholder="'zxcvenorez'"
					:inlineButton="true"
					:counter="32"
					@onChange="modifyInputData"
				/>
				<InputComponent :type="'datetime-local'" />

				<div class="profile__text-block">
					<p class="profile__option-name">Аватар пользователя</p>
					<div class="profile__change-photo-block">
						<img
							src="https://i.imgur.com/T39kQkM.jpeg"
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
import { computed, defineComponent, onMounted, reactive, Ref, ref } from 'vue';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';
import { useRoute, useRouter } from 'vue-router';
import bannedSymbols from '@/data/bannedSymbols';
import LowerPopUp from '@/components/error/LowerPopUp.vue';
import { useStore } from 'vuex';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import InputComponent from '@/components/ui/InputComponent.vue';

export default defineComponent({
	components: { WorkInProgress, LowerPopUp, InputComponent },
	setup() {
		const auth = getAuth();
		const nameOnFirstLoad = auth.currentUser?.displayName || 'Имя пользователя';
		const newName: Ref<string> = ref('');
		const keysPressedCounter: Ref<number> = ref(0);
		const route = useRoute();
		const router = useRouter();
		const path = computed(() => route.path);
		const store = useStore();

		let errorMsg = computed(() => {
			if (!newName.value && keysPressedCounter.value > 0) {
				return 'Не может быть пустым';
			}

			if (
				newName.value.split('').some((letter) => bannedSymbols.includes(letter))
			) {
				return 'Присутствуют запрещенные символы';
			}
		});

		let isBtnDisabled = computed(() => {
			if (keysPressedCounter.value == 0) {
				return true;
			}
			return !!errorMsg.value;
		});

		// const popUpMsg: Ref<{
		// 	type: 'success' | 'error';
		// 	title: string;
		// 	desc: string;
		// }> = ;

		const popUpMsg = reactive({
			type: 'success' as 'success' | 'error',
			title: '' as string,
			desc: '' as string,
		});

		function clearPopUpMsg() {
			popUpMsg.title = '';
			popUpMsg.desc = '';
		}

		function updateDisplayName() {
			if (auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: newName.value,
				})
					.then(async () => {
						popUpMsg.type = 'success';
						popUpMsg.title = 'Имя изменено';
						popUpMsg.desc = 'Ваше новое имя: ' + newName.value;
						store.commit('setNewDisplayName', newName.value);
						// add data to DB
						if (auth.currentUser) {
							try {
								await setDoc(doc(db, 'users', auth.currentUser.uid), {
									displayName: newName.value,
									photoURL: auth.currentUser.photoURL,
								});
							} catch (err: any) {
								console.log('Error adding document: ', err.message);
							}
						}

						// clear the inputs
						newName.value = '';
						keysPressedCounter.value = 0;

						setTimeout(clearPopUpMsg, 3000);
					})
					.catch((error) => {
						popUpMsg.type = 'error';
						popUpMsg.title = 'Что-то пошло не так';
						popUpMsg.desc = 'Попробуйте немного позднее';
						console.log(error);
						newName.value = '';
						keysPressedCounter.value = 0;

						setTimeout(clearPopUpMsg, 3000);
					});
			}
		}

		const isLoggedIn: Ref<boolean> = ref(false);
		const pageLoading: Ref<boolean> = ref(true);
		onMounted(() => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					isLoggedIn.value = true;
				} else {
					isLoggedIn.value = false;
					if (path.value == '/profile') {
						router.push('/');
					}
				}
				pageLoading.value = false;
			});
		});

		// test
		const newID: Ref<string> = ref('');
		const loadedUserData = reactive({
			displayName: '' as string,
			photoURL: '' as string,
		});
		function getUserByID() {
			getAuth();
		}

		// ===========
		// Redesign
		const inputData: Ref<string | null> = ref(null);

		function modifyInputData(newValue: string) {
			inputData.value = newValue;
		}

		return {
			auth,
			nameOnFirstLoad,
			newName,
			errorMsg,
			keysPressedCounter,
			isBtnDisabled,
			pageLoading,
			isLoggedIn,
			popUpMsg,
			updateDisplayName,
			newID,
			loadedUserData,
			getUserByID,
			inputData,
			modifyInputData,
		};
	},
});
</script>
