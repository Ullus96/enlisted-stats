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
					<ClassOrTagsLine
						:soldierClass="item.soldierClass"
						:tags="item.tags"
					/>
					<StatsLine :stats="item.stats" />
				</div>
			</div>

			<!-- Buttons -->
			<div class="build__buttons-wrapper" :class="{ fullheight: true }">
				<BuildButtons :data="item.data" :is-status-visible="isStatusVisible" />
			</div>

			<!-- Avatar Panel -->
			<div class="build__footer" :class="{ fullwidth: false }">
				<BuildAvatarPanel
					:photo-u-r-l="String(loadedUserData.photoURL)"
					:display-name="String(loadedUserData.displayName)"
					:email-hash="String(loadedUserData.emailHash) || ''"
					:avatar-provider="loadedUserData.avatarProvider || 'google'"
					:created-at="item.data.createdAt"
					:updated-at="item.data.updatedAt || null"
				/>
			</div>
		</section>
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from 'vue';
import { ISkillBuild, ISkillBuildWithID } from '@/type/SkillBuild';

import UserAvatar from '@/components/avatar/UserAvatar.vue';
import BuildAvatarPanel from './BuildAvatarPanel.vue';
import StatsLine from './StatsLine.vue';
import ClassOrTagsLine from './ClassOrTagsLine.vue';
import BuildButtons from './BuildButtons.vue';

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
		UserAvatar,
		BuildAvatarPanel,
		StatsLine,
		ClassOrTagsLine,
		BuildButtons,
	},
	setup() {
		return {};
	},
});
</script>
