<template>
	<section
		class="ccard"
		v-shiny-border="{
			height: 2,
			padding: 12,
			hoverRgbaColor: [37, 37, 37, 0.75],
		}"
	>
		<div class="ccard__main">
			<router-link
				v-if="item.dbId"
				:to="'/build/' + item.dbId"
				target="_blank"
				class="build__link"
				v-ripple
			></router-link>
			<div class="ccard__title-section">
				<h4 class="ccard__title">{{ item.data.name }}</h4>
				<div class="ccard__likes-wrapper" v-if="item.data.likesAmount">
					<IconBase class="ccard__heart-icon" :height="10">
						<IconHeart />
					</IconBase>
					<span>{{ item.data.likesAmount }}</span>
				</div>
			</div>
			<div class="ccard__author-section">
				<UserAvatar
					class="ccard__pfp"
					:display-name="loadedUserData.displayName"
					:photo-u-r-l="loadedUserData.photoURL"
					:email-hash="loadedUserData.emailHash"
					:avatar-provider="loadedUserData.avatarProvider"
				/>
				<div class="ccard__name-date-section">
					<span class="ccard__author"> {{ loadedUserData.displayName }} </span>
					<span>•</span>
					<span class="ccard__date">{{
						new Date(item.data.createdAt.seconds * 1000).toLocaleDateString()
					}}</span>
					<span
						class="ccard__updated-block"
						v-if="
							item.data.updatedAt &&
							!isSameDay(item.data.updatedAt, item.data.createdAt)
						"
					>
						<IconBase :height="11">
							<IconPen />
						</IconBase>
						<span>
							{{
								new Date(
									item.data.updatedAt.seconds * 1000,
								).toLocaleDateString()
							}}
						</span>
					</span>
				</div>
			</div>
		</div>
		<div class="ccard__pin">
			<button
				class="btn btn-sm btn-tertiary ccard__pin-btn"
				:class="{ active: isPinned }"
				@click.stop="togglePin($event)"
				v-ripple
			>
				<IconBase>
					<IconBookmark />
				</IconBase>
			</button>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IconBase from '../ui/icon/IconBase.vue';
import IconBookmark from '../ui/icon/icons/IconBookmark.vue';
import IconHeart from '../ui/icon/icons/IconHeart.vue';
import IconPen from '../ui/icon/icons/IconPen.vue';
import UserAvatar from '../shared/avatar/UserAvatar.vue';
import { ISkillBuildWithID } from '@/type/SkillBuild';
import { Timestamp } from 'firebase/firestore';

export default defineComponent({
	emits: ['toggle-pin'],
	props: {
		item: {
			required: true,
			type: Object as PropType<ISkillBuildWithID>,
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
		isPinned: {
			required: false,
			type: Boolean,
			default: false,
		},
	},
	components: { IconBase, IconBookmark, UserAvatar, IconHeart, IconPen },
	setup(props, { emit }) {
		function isSameDay(a: Timestamp, b: Timestamp) {
			const dateA = new Date(a.seconds * 1000);
			const dateB = new Date(b.seconds * 1000);

			return (
				dateA.getDate() === dateB.getDate() &&
				dateA.getMonth() === dateB.getMonth() &&
				dateA.getFullYear() === dateB.getFullYear()
			);
		}

		function togglePin(e: Event) {
			e.stopPropagation();
			if (props.item && props.item.dbId) {
				emit('toggle-pin', props.item.dbId);
			}
		}

		return { isSameDay, togglePin };
	},
});
</script>

<style scoped></style>
