<template>
	<template v-if="isFinishedLoading && loadedUserData">
		<div class="sbuild__item">
			<router-link
				:to="/build/ + item.dbId"
				target="_blank"
				class="sbuild__link"
				v-if="hasLink"
			>
			</router-link>
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
						<span class="sbuild__visibility tooltip-parent" v-else>
							<i class="fa-regular fa-eye-slash"></i>
							<tool-tip :width="'20rem'">Сборка видна только вам</tool-tip>
						</span>
					</template>
				</h2>
				<template v-if="true">
					<div
						class="sbuild__likes-block"
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
										fill="transparent"
										stroke="#fff"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>

						<span class="sbuild__likes-amount">{{ likesAmountOnLoad }}</span>
					</div>
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
					<span> {{ item.stats[1] }} </span> -
					<span> {{ item.stats[2] }} </span>]
				</div>
			</div>

			<template
				v-if="
					loadedUserData &&
					Object.keys(loadedUserData).length > 0 &&
					loadedUserData.photoURL !== null &&
					loadedUserData.displayName !== null
				"
			>
				<div class="sbuild__author-block">
					<img
						:src="loadedUserData.photoURL"
						alt=""
						class="sbuild__author-avatar"
					/>
					<div class="sbuild__author-block-right">
						<p class="sbuild__author-name">
							{{ loadedUserData.displayName }}
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
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { ISkillBuild, ISkillBuildWithID } from '@/type/SkillBuild';
import ToolTip from '@/components/ToolTip.vue';
import {
	convertSkillTagToName,
	getSoldierData,
} from '@/functions/convertSoldierDataToName';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineComponent({
	props: {
		item: {
			required: true,
			type: Object as PropType<ISkillBuildWithID>,
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
			type: Object as PropType<
				Record<string, { displayName: string; photoURL: string }>
			>,
		},
		isFinishedLoading: {
			required: false,
			type: Boolean,
			default: false,
		},
	},
	components: { ToolTip },
	setup(props) {
		function getTrueOrFalse(): boolean {
			return !!Math.floor(Math.random() * 2);
		}

		// const currentUserData = ref(props.loadedData[props.item.data.author]);
		// function getUserData() {
		//   props.loadedData.
		// }

		const likesAmountOnLoad = ref(props.item.data.likedBy.length);
		const isLikedByCurrentUser: Ref<boolean> = ref(false);
		let currentUser = ref(getAuth().currentUser);

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

		return {
			getTrueOrFalse,
			convertSkillTagToName,
			getSoldierData,
			isLikedByCurrentUser,
			likesAmountOnLoad,
		};
	},
});
</script>
