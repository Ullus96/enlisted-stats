<template>
	<div class="sbuild__item">
		<div class="sbuild__header-block">
			<h2 class="sbuild__name">
				{{ item.data.name }}
				<template v-if="isStatusVisible">
					<span
						class="sbuild__visibility tooltip-parent"
						v-if="item.data.isPublic"
					>
						<i class="fa-solid fa-globe"></i>
						<tool-tip :width="'20rem'"
							>Сборка видна всем пользователям</tool-tip
						>
					</span>

					<span
						class="sbuild__visibility tooltip-parent"
						v-if="!item.data.isPublic"
					>
						<i class="fa-regular fa-eye-slash"></i>
						<tool-tip :width="'20rem'">Сборка видна только вам</tool-tip>
					</span>

					<span
						class="sbuild__visibility tooltip-parent"
						v-if="item.data.isCloned"
					>
						<i class="fa-regular fa-copy"></i>
						<tool-tip :width="'20rem'"
							>Сборка клонирована (нельзя сделать общей)</tool-tip
						>
					</span>
				</template>
			</h2>
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
									fill="transparent"
									stroke="#fff"
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
			<template v-else-if="currentUser && currentUser.uid == user.dbId">
				<button class="btn sbuild__delete-btn" @click.prevent="openDeletePopup">
					<i class="fa-regular fa-trash-can"></i>
				</button>
				<template v-if="isDeletePopupVisible">
					<Teleport to="body">
						<div class="page-mask" @click="openDeletePopup">
							<div class="sbuild__delete-popup" @click.stop>
								<h3 class="sbuild__delete-popup-title">
									Удалить сборку
									<span class="sbuild__delete-popup-name">{{
										item.data.name
									}}</span
									>?
								</h3>
								<div class="sbuild__delete-popup-btns">
									<button
										class="btn sbuild__delete-popup-btn--inner sbuild__delete-popup-btn--yes"
										@click="deleteBuild"
									>
										Да
									</button>
									<button
										class="btn sbuild__delete-popup-btn--inner sbuild__delete-popup-btn--no"
										@click="openDeletePopup"
									>
										Нет
									</button>
								</div>
							</div>
						</div>
					</Teleport>
				</template>
			</template>
		</div>

		<div class="sbuild__data-block">
			<div class="sbuild__data-left">
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
					<p class="sbuild__data-desc">
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
					<p class="sbuild__data-desc">
						<span v-for="(tag, idx) in item.tags" :key="tag"
							>{{ convertSkillTagToName(tag)
							}}{{ idx + 1 < item.tags.length ? ', ' : '' }}</span
						>
					</p>
				</template>
			</div>
			<div class="sbuild__data-stats">
				[<span> {{ item.stats[0] }} </span> -
				<span> {{ item.stats[1] }} </span> - <span> {{ item.stats[2] }} </span>]
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
							new Date(item.data.createdAt.seconds * 1000).toLocaleDateString()
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
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { ISkillBuild } from '@/type/SkillBuild';
import ToolTip from '@/components/ToolTip.vue';
import {
	convertSkillTagToName,
	getSoldierData,
} from '@/functions/convertSoldierDataToName';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import AnimatedLikeEntity from './AnimatedLikeEntity.vue';
import randomNum from '@/functions/randomNum';
import { useRouter } from 'vue-router';

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
	components: { ToolTip, AnimatedLikeEntity },
	setup(props) {
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
					await setDoc(docRef, {
						data: {
							author: dataFromDB.data.author,
							createdAt: dataFromDB.data.createdAt,
							isPublic: dataFromDB.data.isPublic,
							isCloned: dataFromDB.data.isCloned,
							name: dataFromDB.data.name,
							nameLowercase: dataFromDB.data.nameLowercase,
							likedBy,
							likesAmount,
						},
						skillsData: dataFromDB.skillsData,
						soldierClass: dataFromDB.soldierClass,
						stats: dataFromDB.stats,
						tags: dataFromDB.tags,
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
					await setDoc(docRef, {
						data: {
							author: dataFromDB.data.author,
							createdAt: dataFromDB.data.createdAt,
							isPublic: dataFromDB.data.isPublic,
							isCloned: dataFromDB.data.isCloned,
							name: dataFromDB.data.name,
							nameLowercase: dataFromDB.data.nameLowercase,
							likedBy,
							likesAmount,
						},
						skillsData: dataFromDB.skillsData,
						soldierClass: dataFromDB.soldierClass,
						stats: dataFromDB.stats,
						tags: dataFromDB.tags,
					});
				} catch (err: any) {
					console.log(
						'Error on adding a build to `likedBuilds`: ' + err.message
					);
				}
			} else {
				console.log(
					'Something went wrong on handling a like button (on `builds` table)!'
				);
			}
		}

		const isDeletePopupVisible: Ref<boolean> = ref(false);

		function openDeletePopup() {
			isDeletePopupVisible.value = !isDeletePopupVisible.value;
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
				// TODO: можно сделать переадресацию на '/success-deleted'
				router.push('/');
			} catch (err: any) {
				alert(`Произошла ошибка: ${err.message}`);
				openDeletePopup();
			}
		}

		return {
			getTrueOrFalse,
			convertSkillTagToName,
			getSoldierData,
			currentUser,
			isLikedByCurrentUser,
			likesAmountOnLoad,
			handleLikeButton,
			animatedHeartsAmount,
			isDeletePopupVisible,
			openDeletePopup,
			deleteBuild,
		};
	},
});
</script>
