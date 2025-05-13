<template>
	<template v-if="isFinishedLoading && loadedUserData">
		<section
			class="build__item"
			v-shiny-border="{
				height: 2,
				padding: 12,
				hoverRgbaColor: [51, 51, 51, 0.76],
			}"
			v-ripple
		>
			<!-- Main -->
			<div class="build__main">
				<h4 class="build__title">
					{{ item.data.name }}
				</h4>

				<div class="build__desc-wrapper">
					<div class="build__class">
						<!-- if soldier has a preset class -->
						<template v-if="item.soldierClass !== 'custom'">
							<img
								:src="
									require('@/assets/soldier_icons/' +
										getSoldierData('id', item.soldierClass, 'icon'))
								"
								alt=""
								class="build__class-icon"
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
								class="build__class-icon"
							/>
							<p>
								<span v-for="(tag, idx) in item.tags" :key="tag"
									>{{ convertSkillTagToName(tag)
									}}{{ idx + 1 < item.tags.length ? ', ' : '' }}</span
								>
							</p>
						</template>
					</div>
					<div class="build__stats">
						<span class="build__stat">
							<IconBase :iconColor="'#94FF94'" :width="14" :height="14">
								<IconMobility />
							</IconBase>
							{{ item.stats[0] }}
						</span>
						<span class="build__separator">-</span>
						<span class="build__stat">
							<IconBase :iconColor="'#FF9494'" :width="14" :height="14">
								<IconMobility />
							</IconBase>
							{{ item.stats[1] }}
						</span>
						<span class="build__separator">-</span>
						<span class="build__stat">
							<IconBase :iconColor="'#FFFF94'" :width="14" :height="14">
								<IconMobility />
							</IconBase>
							{{ item.stats[2] }}
						</span>
					</div>
				</div>
			</div>

			<!-- Buttons -->
			<div class="build__buttons-wrapper" :class="{ fullheight: true }">
				<div class="build__buttons-group">
					<span>1</span>
					<span>2</span>
					<span>3</span>
				</div>
				<div class="build__buttons-group">
					<span>1</span>
				</div>
			</div>

			<!-- Avatar Panel -->
			<div class="build__footer" :class="{ fullwidth: false }">
				<template
					v-if="
						(loadedUserData &&
							Object.keys(loadedUserData).length > 0 &&
							loadedUserData.photoURL !== null &&
							loadedUserData.displayName !== null &&
							String(loadedUserData.avatarProvider) === 'google') ||
						'gravatar' ||
						'none'
					"
				>
					<div class="build__footer-wrapper">
						<UserAvatar
							:photo-u-r-l="String(loadedUserData.photoURL)"
							:display-name="String(loadedUserData.displayName)"
							:email-hash="String(loadedUserData.emailHash) || ''"
							:avatar-provider="loadedUserData.avatarProvider || 'google'"
							class="build__avatar"
						/>
						<div class="build__footer-desc">
							<p class="build__author-name">
								{{ loadedUserData.displayName }}
							</p>
							<div class="build__footer-dates-wrapper">
								<div class="build__footer-date-item">
									<IconBase :width="14" :height="14">
										<IconMagic />
									</IconBase>
									<span class="build__date">
										{{
											new Date(
												item.data.createdAt.seconds * 1000
											).toLocaleDateString()
										}}
									</span>
								</div>
								<div
									class="build__footer-date-item"
									v-if="
										item.data.updatedAt &&
										item.data.updatedAt.seconds !== item.data.createdAt.seconds
									"
								>
									<IconBase :width="12" :height="12">
										<IconPen />
									</IconBase>
									<span class="build__date">
										{{
											new Date(
												item.data.updatedAt.seconds * 1000
											).toLocaleDateString()
										}}
									</span>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
		</section>
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from 'vue';
import { ISkillBuild, ISkillBuildWithID } from '@/type/SkillBuild';
import {
	convertSkillTagToName,
	getSoldierData,
} from '@/functions/convertSoldierDataToName';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconHeart from '@/components/ui/icon/icons/IconHeart.vue';
import IconGlobe from '@/components/ui/icon/icons/IconGlobe.vue';
import IconEyeSlash from '@/components/ui/icon/icons/IconEyeSlash.vue';
import IconTrash from '@/components/ui/icon/icons/IconTrash.vue';
import IconCopy from '@/components/ui/icon/icons/IconCopy.vue';
import IconMagic from '@/components/ui/icon/icons/IconMagic.vue';
import IconPen from '@/components/ui/icon/icons/IconPen.vue';
import IconMobility from '@/components/ui/icon/icons/IconMobility.vue';
import IconVitality from '@/components/ui/icon/icons/IconVitality.vue';
import IconWeapon from '@/components/ui/icon/icons/IconWeapon.vue';
import UserAvatar from '@/components/avatar/UserAvatar.vue';

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
			required: true,
			type: Object as PropType<{
				displayName: string;
				photoURL: string;
				avatarProvider: 'google' | 'gravatar' | 'none' | null;
				emailHash: string;
			}>,
		},
		isFinishedLoading: {
			required: false,
			type: Boolean,
			default: false,
		},
	},
	components: {
		TooltipComponent,
		IconBase,
		IconHeart,
		IconGlobe,
		IconEyeSlash,
		IconTrash,
		IconCopy,
		IconMagic,
		IconPen,
		IconMobility,
		IconVitality,
		IconWeapon,
		UserAvatar,
	},
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
