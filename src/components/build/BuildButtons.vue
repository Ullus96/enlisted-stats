<template>
	<div class="build__buttons-group" @click.stop>
		<button
			class="build__likes-block"
			:class="{
				active: isLikedByCurrentUser,
				clickable: !isUserAnAuthor(),
			}"
			:style="{
				cursor: isUserAnAuthor() ? 'default' : 'pointer',
			}"
			@click="handleLikeButton"
		>
			<div class="build__icon-container">
				<div class="build__icon-main">
					<svg
						width="20"
						height="16"
						viewBox="0 0 20 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="build__likes-svg"
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

			<span class="build__likes-amount">{{ localLikesAmount }}</span>
		</button>
		<!-- Shows all buttons (visibility, cloned) -->
		<template v-if="!isPreview">
			<!-- Visibility -->
			<div v-if="data.isPublic" class="tooltip-anchor">
				<TooltipComponent :direction="'left'" :width="22">
					<p>Видна всем пользователям</p>
				</TooltipComponent>
				<button
					class="build__button"
					:style="{
						cursor: isUserAnAuthor() ? 'pointer' : 'default',
					}"
					@click="handleVisibilitySwitchButton"
					v-ripple
				>
					<IconBase :iconColor="'#a5a5a5'">
						<IconGlobe />
					</IconBase>
				</button>
			</div>
			<div v-else class="tooltip-anchor">
				<TooltipComponent :direction="'left'" :width="22">
					<p>Видна только вам</p>
				</TooltipComponent>
				<button
					class="build__button"
					:style="{
						cursor: isUserAnAuthor() && !data.isCloned ? 'pointer' : 'default',
					}"
					@click="handleVisibilitySwitchButton"
					v-ripple
				>
					<IconBase :iconColor="'#a5a5a5'">
						<IconEyeSlash />
					</IconBase>
				</button>
			</div>
			<!-- End of Visibility -->
			<!-- Cloned -->
			<div class="tooltip-anchor" v-if="data.isCloned">
				<TooltipComponent :direction="'left'" :width="22">
					<p>Сборка является копией</p>
				</TooltipComponent>
				<button class="build__button" style="cursor: default">
					<IconBase :iconColor="'#a5a5a5'">
						<IconCopy />
					</IconBase>
				</button>
			</div>
		</template>
	</div>
	<div class="build__buttons-group" v-if="!isPreview" @click.stop>
		<div class="tooltip-anchor">
			<TooltipComponent :direction="'left'" :width="10">
				<p>Удалить</p>
			</TooltipComponent>
			<button
				class="build__button"
				@click="$store.state.dialog.isDeletingBuild = true"
				v-ripple
			>
				<IconBase :iconColor="'#a5a5a5'">
					<IconTrash />
				</IconBase>
			</button>
		</div>

		<DialogComponent
			:dialogName="'isDeletingBuild'"
			v-if="$store.state.dialog.isDeletingBuild"
			:yes="{ text: 'Удалить', type: 'primary' }"
			:no="{ text: 'Отмена', type: 'tertiary' }"
			@confirm="deleteBuild"
		>
			<template #title>Удалить сборку?</template>

			Это действие удалит сборку
			<span>{{ data.name }}</span
			>.
		</DialogComponent>

		<DialogComponent
			:dialogName="'isSwitchingBuildVisibility'"
			v-if="$store.state.dialog.isSwitchingBuildVisibility"
			:yes="{ text: 'Переключить', type: 'primary' }"
			:no="{ text: 'Отмена', type: 'tertiary' }"
			@confirm="switchBuildVisibility"
		>
			<template #title>Переключить видимость?</template>

			Это действие переключит видимость сборки
			<span>{{ data.name }}</span
			>.
		</DialogComponent>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { useStore } from '@/store/useStore';
import { useRouter } from 'vue-router';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconGlobe from '@/components/ui/icon/icons/IconGlobe.vue';
import IconEyeSlash from '@/components/ui/icon/icons/IconEyeSlash.vue';
import IconTrash from '@/components/ui/icon/icons/IconTrash.vue';
import IconCopy from '@/components/ui/icon/icons/IconCopy.vue';
import { ISkillBuildData, ISkillBuildWithID } from '@/type/SkillBuild';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import AnimatedLikeEntity from './AnimatedLikeEntity.vue';
import randomNum from '@/functions/randomNum';
import {
	arrayRemove,
	arrayUnion,
	deleteDoc,
	doc,
	getDoc,
	increment,
	updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { createPopUp } from '../popup/utils';
import {
	POPUP_BUILD_VISIBILITY_CHANGED,
	POPUP_DELETE_BUILD_SUCCESS,
} from '../popup/data';
import DialogComponent from '@/components/ui/DialogComponent.vue';

export default defineComponent({
	components: {
		TooltipComponent,
		IconBase,
		IconGlobe,
		IconEyeSlash,
		IconTrash,
		IconCopy,
		DialogComponent,
		AnimatedLikeEntity,
	},
	props: {
		data: {
			required: true,
			type: Object as PropType<ISkillBuildData>,
		},
		build: {
			required: true,
			type: Object as PropType<ISkillBuildWithID>,
		},
		variation: {
			required: false,
			type: String as PropType<'preview' | 'full'>,
			default: 'preview',
		},
	},
	setup(props) {
		const localLikesAmount: Ref<number> = ref(props.data.likedBy.length);
		const isLikedByCurrentUser: Ref<boolean> = ref(false);
		let currentUser = ref(getAuth().currentUser);
		const isPreview = computed(() => props.variation === 'preview');
		const store = useStore();
		const router = useRouter();

		function checkIfLikedByCurrentUser(userUid: any) {
			if (userUid && props.data.likedBy.includes(userUid)) {
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

		// Likes handler
		const animatedHeartsAmount = ref(0);

		async function handleLikeButton() {
			if (currentUser.value) {
				if (isUserAnAuthor()) return;
				const docRef = doc(db, 'builds', props.build.dbId);

				if (!isLikedByCurrentUser.value) {
					localLikesAmount.value++;
					animatedHeartsAmount.value = Math.floor(randomNum(4, 8));

					try {
						await updateDoc(docRef, {
							'data.likedBy': arrayUnion(currentUser.value.uid),
							'data.likesAmount': increment(1),
						});
					} catch (error) {
						console.error('Ошибка при обновлении:', error);
						localLikesAmount.value--;
						animatedHeartsAmount.value = 0;
					}
					// firestoreBuildsLikedBy(
					// 	currentUser.value.uid,
					// 	props.build.dbId,
					// 	'add'
					// );
				} else {
					localLikesAmount.value--;
					animatedHeartsAmount.value = 0;

					try {
						await updateDoc(docRef, {
							'data.likedBy': arrayRemove(currentUser.value.uid),
							'data.likesAmount': increment(-1),
						});
					} catch (error) {
						console.error('Ошибка при обновлении:', error);
						localLikesAmount.value++;
					}
					// firestoreBuildsLikedBy(
					// 	currentUser.value.uid,
					// 	props.build.dbId,
					// 	'remove'
					// );
				}
			}

			isLikedByCurrentUser.value = !isLikedByCurrentUser.value;
		}

		// async function firestoreBuildsLikedBy(
		// 	userID: string,
		// 	buildID: string,
		// 	operation: 'add' | 'remove'
		// ) {
		// 	const docRef = doc(db, 'builds', buildID);
		// 	const docSnap = await getDoc(docRef);
		// 	let dataFromDB;
		// 	if (docSnap.exists()) {
		// 		dataFromDB = docSnap.data();
		// 	} else {
		// 		return;
		// 	}

		// 	if (operation === 'add') {
		// 		try {
		// 			dataFromDB.data.likedBy.push(userID);

		// 			await updateDoc(docRef, {
		// 				'data.likedBy': dataFromDB.data.likedBy,
		// 				'data.likesAmount': dataFromDB.data.likesAmount + 1 || 1,
		// 			});
		// 		} catch (err: any) {
		// 			console.log(
		// 				'Error on adding a build to `likedBuilds`: ' + err.message
		// 			);
		// 		}
		// 	} else if (operation === 'remove') {
		// 		try {
		// 			const likedBy = dataFromDB.data.likedBy.filter(
		// 				(id: string) => id !== userID
		// 			);
		// 			let likesAmount = dataFromDB.data.likesAmount - 1 || 0;
		// 			if (likesAmount < 0) {
		// 				likesAmount = 0;
		// 			}
		// 			await updateDoc(docRef, {
		// 				'data.likedBy': likedBy,
		// 				'data.likesAmount': likesAmount,
		// 			});
		// 		} catch (err: any) {
		// 			console.error(
		// 				'Error on removing a build from `likedBuilds`: ' + err.message
		// 			);
		// 		}
		// 	} else {
		// 		console.error('Invalid operation type: ' + operation);
		// 	}
		// }

		// Check if current user is an author
		function isUserAnAuthor() {
			return props.data.author === currentUser.value?.uid;
		}

		// Delete
		async function deleteBuild() {
			if (!isUserAnAuthor()) {
				return false;
			}

			const docRef = doc(db, 'builds', props.build.dbId);

			try {
				await deleteDoc(docRef);
				console.log(`${props.build.dbId} был удален из БД`);
				createPopUp(store, POPUP_DELETE_BUILD_SUCCESS);
				router.push('/');
			} catch (err: any) {
				alert(`Произошла ошибка: ${err.message}`);
			}
		}

		// Visibility switch
		function handleVisibilitySwitchButton() {
			if (!isUserAnAuthor()) return;
			if (props.data.isCloned) return;

			store.commit('toggleDialogVisibility', {
				name: 'isSwitchingBuildVisibility',
			});
		}

		async function switchBuildVisibility() {
			const docRef = doc(db, 'builds', props.build.dbId);
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
				props.data.isPublic = !dataFromDB.data.isPublic;
				createPopUp(store, POPUP_BUILD_VISIBILITY_CHANGED);
			} catch (err: any) {
				console.log('Error on switching build visibility: ' + err.message);
			}
		}

		onMounted(() => {
			console.group(props.data, props.build);
			console.groupEnd();
		});

		return {
			isLikedByCurrentUser,
			currentUser,
			localLikesAmount,
			isPreview,
			animatedHeartsAmount,
			handleLikeButton,
			isUserAnAuthor,
			deleteBuild,
			handleVisibilitySwitchButton,
			switchBuildVisibility,
		};
	},
});
</script>

<style scoped></style>
