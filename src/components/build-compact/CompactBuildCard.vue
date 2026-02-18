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
				v-shiny-border="{
					height: 2,
					padding: 12,
					hoverRgbaColor: [51, 51, 51, 0.76],
				}"
				v-ripple
			></router-link>
			<div class="ccard__title-section">
				<h4 class="ccard__title">{{ item.data.name }}</h4>
				<div class="ccard__likes-wrapper">
					<span>♥</span>
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
					<!-- сюда добавить карандаш и updatedAt -->
				</div>
			</div>
		</div>
		<div class="ccard__pin">
			<button
				class="btn btn-sm btn-tertiary ccard__pin-btn"
				:class="{
					active: Math.random() < 0.5 ? true : false,
				}"
				@click.stop
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
import UserAvatar from '../shared/avatar/UserAvatar.vue';
import { ISkillBuildWithID } from '@/type/SkillBuild';

export default defineComponent({
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
	},
	components: { IconBase, IconBookmark, UserAvatar },
	setup(props) {
		console.log(props.loadedUserData);
		return {};
	},
});
</script>

<style scoped></style>
