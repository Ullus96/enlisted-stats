<template>
	<section class="sbuild__item">
		<div class="sbuild__main-content">
			<p class="sbuild__name">
				{{ item.data.name }}
			</p>

			<div class="sbuild__data-block">
				<div class="sbuild__data-class">
					<!-- if soldier has a preset class -->
					<template v-if="item.soldierClass !== 'custom'">
						<img
							:src="
								require('@/assets/soldier_icons/' +
									getSoldierData('id', item.soldierClass, 'icon'))
							"
							alt=""
							class="sbuild__data-icon"
						/>
						<p>
							{{ getSoldierData('id', item.soldierClass, 'name') }}
						</p>
					</template>

					<!-- else show his tags -->
					<template v-else>
						<img
							:src="require('@/assets/soldier_icons/tags.svg')"
							alt=""
							class="sbuild__data-icon"
						/>
						<p>
							<span v-for="(tag, idx) in item.tags" :key="tag"
								>{{ convertSkillTagToName(tag)
								}}{{ idx + 1 < item.tags.length ? ', ' : '' }}</span
							>
						</p>
					</template>
				</div>
				<div class="sbuild__data-stats">
					<span class="sbuild__data-stat">
						<IconBase :iconColor="'#94FF94'" :width="14" :height="14">
							<IconMobility />
						</IconBase>
						{{ item.stats[0] }}
					</span>
					<span class="sbuild__data-separator">-</span>
					<span class="sbuild__data-stat">
						<IconBase :iconColor="'#FF9494'" :width="14" :height="14">
							<IconMobility />
						</IconBase>
						{{ item.stats[1] }}
					</span>
					<span class="sbuild__data-separator">-</span>
					<span class="sbuild__data-stat">
						<IconBase :iconColor="'#FFFF94'" :width="14" :height="14">
							<IconMobility />
						</IconBase>
						{{ item.stats[2] }}
					</span>
				</div>
			</div>

			<template v-if="user">
				<div class="sbuild__author-block">
					<img :src="user.photoURL" alt="" class="sbuild__author-avatar" />
					<div class="sbuild__author-block-right">
						<p class="sbuild__author-name">
							{{ user.displayName }}
						</p>
						<p class="sbuild__author-date">
							{{
								new Date(
									item.data.createdAt.seconds * 1000
								).toLocaleDateString()
							}}
						</p>
					</div>
				</div>
			</template>
			<!-- else if we don't have any data (deleted user) -->
			<template v-else>
				<div class="sbuild__author-block">
					<img
						src="https://place-hold.it/80x80/8c8f94/8c8f94.jpg"
						alt=""
						class="sbuild__author-avatar"
					/>
					<div class="sbuild__author-block-right">
						<p class="sbuild__author-name">Пользователь не найден</p>
						<p class="sbuild__author-date">—</p>
					</div>
				</div>
			</template>
		</div>

		<!-- Icons column -->
		<div class="sbuild__info-col">
			<div class="sbuild__icons-top">
				<template v-if="currentUser && currentUser.uid !== user.dbId">
					<div
						class="sbuild__likes-block"
						:class="{ active: isLikedByCurrentUser }"
						@click="handleLikeButton"
					>
						<div class="sbuild__icon-container">
							<div class="sbuild__icon-main">
								<svg
									width="20"
									height="16"
									viewBox="0 0 20 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="sbuild__likes-svg"
								>
									<path
										d="M9.62064 2.29822C9.71563 2.40892 9.85422 2.47262 10.0001 2.47262C10.146 2.47262 10.2846 2.40892 10.3795 2.29822C12.042 0.360759 14.697 -0.164272 16.7433 1.53117C18.8279 3.25825 19.0829 6.18754 17.4711 8.25512C16.761 9.16591 15.3047 10.6111 13.8175 12.0104C12.3398 13.4007 10.8626 14.7173 10.1329 15.3615C10.0911 15.3983 10.0585 15.4271 10.0298 15.4516C10.0158 15.4637 10.004 15.4736 9.99388 15.4818C9.96318 15.4567 9.92162 15.4203 9.85502 15.3615L9.85497 15.3615C9.12523 14.7173 7.64801 13.4007 6.17037 12.0104C4.68313 10.6111 3.22682 9.16591 2.51676 8.25513C0.90935 6.19323 1.19206 3.2793 3.24966 1.5268L2.92546 1.14615L3.24966 1.5268C5.25246 -0.179029 7.95452 0.35653 9.62064 2.29822Z"
										fill="#a5a5a5"
										stroke="#a5a5a5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<animated-like-entity
								v-for="item in animatedHeartsAmount"
								:key="item"
							></animated-like-entity>
						</div>

						<span class="sbuild__likes-amount">{{ likesAmountOnLoad }}</span>
					</div>
				</template>
				<template v-else>
					<div
						class="sbuild__likes-block--no-anim"
						:class="{ active: isLikedByCurrentUser }"
					>
						<div class="sbuild__icon-container">
							<div class="sbuild__icon-main">
								<svg
									width="20"
									height="16"
									viewBox="0 0 20 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="sbuild__likes-svg"
								>
									<path
										d="M9.62064 2.29822C9.71563 2.40892 9.85422 2.47262 10.0001 2.47262C10.146 2.47262 10.2846 2.40892 10.3795 2.29822C12.042 0.360759 14.697 -0.164272 16.7433 1.53117C18.8279 3.25825 19.0829 6.18754 17.4711 8.25512C16.761 9.16591 15.3047 10.6111 13.8175 12.0104C12.3398 13.4007 10.8626 14.7173 10.1329 15.3615C10.0911 15.3983 10.0585 15.4271 10.0298 15.4516C10.0158 15.4637 10.004 15.4736 9.99388 15.4818C9.96318 15.4567 9.92162 15.4203 9.85502 15.3615L9.85497 15.3615C9.12523 14.7173 7.64801 13.4007 6.17037 12.0104C4.68313 10.6111 3.22682 9.16591 2.51676 8.25513C0.90935 6.19323 1.19206 3.2793 3.24966 1.5268L2.92546 1.14615L3.24966 1.5268C5.25246 -0.179029 7.95452 0.35653 9.62064 2.29822Z"
										fill="#a5a5a5"
										stroke="#a5a5a5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>

						<span class="sbuild__likes-amount">{{ likesAmountOnLoad }}</span>
					</div>
				</template>

				<!-- Shows all buttons (visibility, cloned) -->
				<template v-if="isStatusVisible">
					<!-- Visibility -->
					<div class="tooltip-anchor" v-if="item.data.isPublic">
						<TooltipComponent :direction="'left'" :width="22">
							<p>Видна всем пользователям</p>
						</TooltipComponent>
						<button
							class="sbuild__card"
							v-if="
								currentUser &&
								currentUser.uid == user.dbId &&
								!item.data.isCloned
							"
							@click="$store.state.dialog.isSwitchingBuildVisibility = true"
						>
							<IconBase :iconColor="'#a5a5a5'">
								<IconGlobe />
							</IconBase>
						</button>
						<div class="sbuild__card" v-else>
							<IconBase :iconColor="'#a5a5a5'">
								<IconGlobe />
							</IconBase>
						</div>
					</div>
					<div class="tooltip-anchor" v-else>
						<TooltipComponent :direction="'left'" :width="22">
							<p>Видна только вам</p>
						</TooltipComponent>
						<button
							class="sbuild__card"
							v-if="
								currentUser &&
								currentUser.uid == user.dbId &&
								!item.data.isCloned
							"
							@click="$store.state.dialog.isSwitchingBuildVisibility = true"
						>
							<IconBase :iconColor="'#a5a5a5'">
								<IconEyeSlash />
							</IconBase>
						</button>
						<div class="sbuild__card" v-else>
							<IconBase :iconColor="'#a5a5a5'">
								<IconEyeSlash />
							</IconBase>
						</div>
					</div>
					<!-- End of Visibility -->
					<!-- Cloned -->
					<div class="tooltip-anchor" v-if="item.data.isCloned">
						<TooltipComponent :direction="'left'" :width="22">
							<p>Сборка является копией</p>
						</TooltipComponent>
						<div class="sbuild__card">
							<IconBase :iconColor="'#a5a5a5'">
								<IconCopy />
							</IconBase>
						</div>
					</div>
				</template>
			</div>

			<div class="sbuild__icons-bottom">
				<template v-if="isStatusVisible">
					<template v-if="currentUser && currentUser.uid == user.dbId">
						<div class="tooltip-anchor">
							<TooltipComponent :direction="'left'" :width="10">
								<p>Удалить</p>
							</TooltipComponent>
							<button
								class="sbuild__card"
								@click="$store.state.dialog.isDeletingBuild = true"
							>
								<IconBase :iconColor="'#a5a5a5'">
									<IconTrash />
								</IconBase>
							</button>
						</div>

						<DialogComponent
							:dialogName="'isDeletingBuild'"
							v-if="$store.state.dialog.isDeletingBuild"
							:yes="{ text: 'Удалить', type: 'tertiary' }"
							:no="{ text: 'Отмена', type: 'primary' }"
							@confirm="deleteBuild"
						>
							<h3 class="dialog__title">Удалить сборку?</h3>
							<p class="dialog__desc">
								Это действие удалит сборку
								<span class="dialog__accent">{{ item.data.name }}</span
								>.
							</p>
						</DialogComponent>

						<DialogComponent
							:dialogName="'isSwitchingBuildVisibility'"
							v-if="$store.state.dialog.isSwitchingBuildVisibility"
							:yes="{ text: 'Переключить', type: 'tertiary' }"
							:no="{ text: 'Отмена', type: 'primary' }"
							@confirm="switchBuildVisibility"
						>
							<h3 class="dialog__title">Переключить видимость?</h3>
							<p class="dialog__desc">
								Это действие переключит видимость сборки
								<span class="dialog__accent">{{ item.data.name }}</span
								>.
							</p>
						</DialogComponent>
					</template>
				</template>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { ISkillBuild } from '@/type/SkillBuild';
import {
	convertSkillTagToName,
	getSoldierData,
} from '@/functions/convertSoldierDataToName';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import AnimatedLikeEntity from './AnimatedLikeEntity.vue';
import randomNum from '@/functions/randomNum';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { createPopUp } from '@/components/popup/utils';
import {
	POPUP_BUILD_VISIBILITY_CHANGED,
	POPUP_DELETE_BUILD_SUCCESS,
} from '@/components/popup/data';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import DialogComponent from '@/components/ui/DialogComponent.vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconHeart from '@/components/ui/icons/IconHeart.vue';
import IconGlobe from '@/components/ui/icons/IconGlobe.vue';
import IconEyeSlash from '@/components/ui/icons/IconEyeSlash.vue';
import IconTrash from '@/components/ui/icons/IconTrash.vue';
import IconCopy from '@/components/ui/icons/IconCopy.vue';
import IconMobility from '@/components/ui/icons/IconMobility.vue';
import IconVitality from '@/components/ui/icons/IconVitality.vue';
import IconWeapon from '@/components/ui/icons/IconWeapon.vue';

export default defineComponent({
	props: {
		item: {
			required: true,
			type: Object as PropType<ISkillBuild>,
		},
		hasLink: {
			required: false,
			type: Boolean,
			default: true,
		},
		isStatusVisible: {
			required: false,
			type: Boolean,
			default: false,
		},
		loadedUserData: {
			required: false,
			type: Object,
			// type: Object as PropType<
			// 	Record<string, { displayName: string; photoURL: string }>
			// >,
		},
		user: {
			required: true,
			type: Object,
		},
		isFinishedLoading: {
			required: false,
			type: Boolean,
			default: false,
		},
		buildId: {
			required: true,
			type: String,
		},
	},
	components: {
		AnimatedLikeEntity,
		TooltipComponent,
		DialogComponent,
		IconBase,
		IconHeart,
		IconGlobe,
		IconEyeSlash,
		IconTrash,
		IconCopy,
		IconMobility,
		IconVitality,
		IconWeapon,
	},
	setup(props) {
		const store = useStore();
		function getTrueOrFalse(): boolean {
			return !!Math.floor(Math.random() * 2);
		}

		let currentUser = ref(getAuth().currentUser);

		// const currentUserData = ref(props.loadedData[props.item.data.author]);
		// function getUserData() {
		//   props.loadedData.
		// }

		const isLikedByCurrentUser: Ref<boolean> = ref(false);
		function checkIfLikedByCurrentUser(userUid: any) {
			if (userUid && props.item.data.likedBy.includes(userUid)) {
				isLikedByCurrentUser.value = true;
			}
		}

		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				currentUser.value = user;
				checkIfLikedByCurrentUser(user.uid);
			} else {
				isLikedByCurrentUser.value = false;
				currentUser.value = null;
			}
		});

		const likesAmountOnLoad = ref(props.item.data.likedBy.length);
		const animatedHeartsAmount = ref(0);

		function handleLikeButton() {
			if (currentUser.value) {
				if (!isLikedByCurrentUser.value) {
					likesAmountOnLoad.value++;
					animatedHeartsAmount.value = Math.floor(randomNum(4, 8));
					firestoreBuildsLikedBy(currentUser.value.uid, props.buildId, 'add');
				} else {
					likesAmountOnLoad.value--;
					animatedHeartsAmount.value = 0;
					firestoreBuildsLikedBy(
						currentUser.value.uid,
						props.buildId,
						'remove'
					);
				}
			}

			isLikedByCurrentUser.value = !isLikedByCurrentUser.value;
		}

		async function firestoreBuildsLikedBy(
			userID: string,
			buildID: string,
			operation: 'add' | 'remove'
		) {
			const docRef = doc(db, 'builds', buildID);
			const docSnap = await getDoc(docRef);
			let dataFromDB;
			if (docSnap.exists()) {
				dataFromDB = docSnap.data();
			} else {
				return;
			}

			if (operation === 'add') {
				try {
					const likedBy = [...dataFromDB.data.likedBy, userID];
					let likesAmount = dataFromDB.data.likesAmount + 1 || 1;
					await updateDoc(docRef, {
						'data.likedBy': likedBy,
						'data.likesAmount': likesAmount,
					});
				} catch (err: any) {
					console.log(
						'Error on adding a build to `likedBuilds`: ' + err.message
					);
				}
			} else if (operation === 'remove') {
				try {
					const likedBy = dataFromDB.data.likedBy.filter(
						(id: string) => id !== userID
					);
					let likesAmount = dataFromDB.data.likesAmount - 1 || 0;
					if (likesAmount < 0) {
						likesAmount = 0;
					}
					await updateDoc(docRef, {
						'data.likedBy': likedBy,
						'data.likesAmount': likesAmount,
					});
				} catch (err: any) {
					console.error(
						'Error on removing a build from `likedBuilds`: ' + err.message
					);
				}
			} else {
				console.error('Invalid operation type: ' + operation);
			}
		}

		const router = useRouter();
		async function deleteBuild() {
			if (props.item.data.author !== currentUser.value?.uid) {
				return false;
			}

			const docRef = doc(db, 'builds', props.buildId);

			try {
				await deleteDoc(docRef);
				console.log(`${props.buildId} был удален из БД`);
				createPopUp(store, POPUP_DELETE_BUILD_SUCCESS);
				router.push('/');
			} catch (err: any) {
				alert(`Произошла ошибка: ${err.message}`);
			}
		}

		async function switchBuildVisibility() {
			const docRef = doc(db, 'builds', props.buildId);
			const docSnap = await getDoc(docRef);
			let dataFromDB;
			if (docSnap.exists()) {
				dataFromDB = docSnap.data();
			} else {
				return;
			}

			try {
				await updateDoc(docRef, {
					'data.isPublic': !dataFromDB.data.isPublic,
				});
				props.item.data.isPublic = !dataFromDB.data.isPublic;
				createPopUp(store, POPUP_BUILD_VISIBILITY_CHANGED);
			} catch (err: any) {
				console.log('Error on switching build visibility: ' + err.message);
			}
		}

		onMounted(() => {
			if (
				!props.item.data.isPublic &&
				props.item.data.author !== store.state.user.uid
			) {
				router.push('/');
			}
		});

		return {
			getTrueOrFalse,
			convertSkillTagToName,
			getSoldierData,
			currentUser,
			isLikedByCurrentUser,
			likesAmountOnLoad,
			handleLikeButton,
			animatedHeartsAmount,
			deleteBuild,
			switchBuildVisibility,
		};
	},
});
</script>
