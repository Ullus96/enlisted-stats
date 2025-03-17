<template>
	<div class="container mt-l">
		<div class="container-sm" v-if="isLoading">
			<h3>Настройки</h3>
			<div class="tabs skeleton__tabs">
				<div class="skeleton__tab" v-for="n in 3" :key="n"></div>
			</div>
			<div class="skeleton__title mt-l"></div>
			<div class="skeleton__flex-col">
				<div class="skeleton__desc"></div>
				<div class="skeleton__desc"></div>
				<div class="skeleton__desc"></div>
				<div class="skeleton__desc skeleton__desc--short"></div>
			</div>
		</div>

		<div class="container-sm" v-else>
			<h3>Настройки</h3>

			<TabsComponent
				:tabs="tabsList"
				:default-tab="user ? 'profile' : 'app'"
				@setActiveTab="
					(tab) => {
						activeTab = tab;
					}
				"
			/>

			<transition name="slide-down-fade" mode="out-in">
				<div v-if="activeTab === 'profile'">
					<div class="profile__avatar-block">
						<img
							:src="$store.state.user.photoUrl"
							alt="Profile picture"
							class="profile__avatar"
						/>
						<h2 class="profile__nickname">
							{{ $store.state.user.displayName }}
						</h2>
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
									Google - Личная информация, и поменяй фотографию пользователя
									там. Обновление займет какое-то время.
								</p>
							</div>
						</div>

						<div class="profile__delete-block">
							<div class="profile__text-block">
								<p class="profile__option-name">Удалить профиль</p>
								<p class="profile__option-desc">
									При удалении учетной записи, вся информация, включая
									электронную почту пользователя, аватар пользователя, а так же
									отображаемое имя будут удалены. Сборки все еще будут доступны,
									однако, автор сборки сменится на “Неизвестен”
								</p>
							</div>
							<button
								class="btn btn-secondary btn-m profile__btn"
								@click="$store.state.dialog.isDeletingAccount = true"
								v-ripple
							>
								Удалить профиль
							</button>
						</div>
					</section>
				</div>

				<section class="profile__block" v-else-if="activeTab === 'app'">
					<div class="profile__title-desc-action-block">
						<div class="profile__title-desc-block">
							<p class="profile__option-name">Компактный режим калькулятора</p>
							<p class="profile__option-desc">
								Сделает размер калькулятора более миниатюрным, посредством
								уменьшения размера иконок.
							</p>
						</div>
						<label class="checkbox-wrapper-2 profile__checkbox-wrapper">
							<input
								type="checkbox"
								class="sc-gJwTLC ikxBAC"
								v-model="compactMode"
							/>
						</label>
					</div>

					<div class="profile__title-desc-action-block">
						<div class="profile__title-desc-block">
							<p class="profile__option-name">
								Отображение наград внутри карточек
							</p>
							<p class="profile__option-desc">
								Отображает награды событий прямо на карточках, вместо
								всплывающих подсказок.
							</p>
						</div>
						<label class="checkbox-wrapper-2 profile__checkbox-wrapper">
							<input
								type="checkbox"
								class="sc-gJwTLC ikxBAC"
								v-model="inlineRewards"
							/>
						</label>
					</div>

					<div class="profile__title-desc-action-block">
						<div
							class="profile__title-desc-block profile__title-desc-block--fw"
						>
							<p class="profile__option-name">Размер карточек событий</p>
							<p class="profile__option-desc">
								Выберите x2 для увеличенной ширины.<br />
								На телефонах оба варианта выглядят одинаково.
							</p>
						</div>
						<div class="profile__chips-flex">
							<button
								class="chip"
								v-for="scale in [1, 2]"
								:key="scale"
								@click="eventCardWidth = scale"
								:class="{
									active: eventCardWidth === scale,
								}"
								v-ripple
							>
								x{{ scale }}
							</button>
						</div>
					</div>
				</section>
			</transition>
		</div>

		<DialogComponent
			:dialogName="'isDeletingAccount'"
			v-if="$store.state.dialog.isDeletingAccount"
			:yes="{ text: 'Удалить', type: 'primary' }"
			:no="{ text: 'Отмена', type: 'tertiary' }"
			@confirm="deleteAccount"
		>
			<template #title>Удалить учетную запись?</template>

			Это действие необратимо. Возможности восстановить учетную запись, а так же
			все сохраненные сборки - не будет.
		</DialogComponent>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeMount,
	onMounted,
	Ref,
	ref,
	watch,
} from 'vue';
import {
	deleteUser,
	getAuth,
	onAuthStateChanged,
	updateProfile,
	User,
} from 'firebase/auth';
import { useStore } from '@/store/useStore';
import { useRouter } from 'vue-router';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import InputComponent from '@/components/input/InputComponent.vue';
import DialogComponent from '@/components/ui/DialogComponent.vue';
import { createPopUp } from '@/components/popup/utils';
import {
	POPUP_CHANGE_NAME_SUCCESS,
	POPUP_CHANGE_NAME_ERROR,
	POPUP_DELETE_USER_SUCCESS,
	POPUP_DELETE_USER_ERROR,
} from '@/components/popup/data';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';
import TabsComponent from '@/components/tabs/TabsComponent.vue';
import { TabsStructure } from '@/components/tabs/types';
import {
	TRootVariables,
	updateRootVariable,
	getRootVariable,
} from '@/functions/rootVariables';

export default defineComponent({
	components: { InputComponent, DialogComponent, TabsComponent },
	setup() {
		const auth = getAuth();
		const user: Ref<User | null> = ref(null);

		const store = useStore();
		const router = useRouter();

		const isLoading: Ref<boolean> = ref(true);

		onBeforeMount(() => {
			onAuthStateChanged(auth, (firebaseUser) => {
				user.value = firebaseUser;

				if (firebaseUser) {
					tabsList.unshift({ id: 'profile', text: 'Профиль' });
				}

				isLoading.value = false;
			});
		});

		// Табы
		const tabsList: TabsStructure = [{ id: 'app', text: 'Приложение' }];

		const activeTab: Ref<(typeof tabsList)[number]['id'] | null> = ref(null);

		// Сами настройки
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
						createPopUp(store, POPUP_CHANGE_NAME_SUCCESS);
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
						createPopUp(store, POPUP_CHANGE_NAME_ERROR);
						console.log(error);
					});
			}
		}

		// Удаление
		function deleteAccount() {
			if (!user.value) return;

			const uid = user.value.uid;

			deleteUser(user.value)
				.then(() => {
					const docRef = doc(db, 'users', uid);
					try {
						deleteDoc(docRef);
						createPopUp(store, POPUP_DELETE_USER_SUCCESS);
						router.push('/');
					} catch (error: any) {
						createPopUp(store, POPUP_DELETE_USER_ERROR);
						console.error(error.message);
					}
				})
				.catch((error) => {
					createPopUp(store, POPUP_DELETE_USER_ERROR);
					console.error(error.message);
				});
		}

		// Компактный режим
		const compactMode: Ref<boolean> = ref(
			loadFromLocalStorage('compactMode') || false
		);

		watch(compactMode, (newVal) => {
			saveToLocalStorage('compactMode', newVal);
			store.commit('switchCompactMode', newVal);
		});

		// Инлайн награды
		const inlineRewards: Ref<boolean> = ref(
			loadFromLocalStorage('inlineRewards') || false
		);

		watch(inlineRewards, (newVal) => {
			saveToLocalStorage('inlineRewards', newVal);
			store.commit('switchInlineRewards', newVal);
		});

		// Ширина карточки
		const eventCardWidth: Ref<number> = ref(
			loadFromLocalStorage('eventCardWidth') || false
		);

		watch(eventCardWidth, (newVal) => {
			saveToLocalStorage('eventCardWidth', newVal);
			store.commit('setEventCardWidth', newVal);

			updateRootVariable('--ui-card-width', `${newVal * 10}rem`);
		});

		return {
			auth,
			user,
			isLoading,
			tabsList,
			activeTab,
			inputName,
			modifyInputData,
			updateDisplayName,
			deleteAccount,
			compactMode,
			inlineRewards,
			eventCardWidth,
			updateRootVariable,
			getRootVariable,
		};
	},
});
</script>
