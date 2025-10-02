<template>
	<section
		class="ccard"
		v-shiny-border="{
			height: 2,
			padding: 12,
			hoverRgbaColor: [51, 51, 51, 0.76],
		}"
	>
		<div class="ccard__main">
			<!-- сюда линк -->
			<!-- <router-link
				v-if="isClickable && hasLink && item.dbId"
				:to="'/build/' + item.dbId"
				target="_blank"
				class="build__link"
				v-shiny-border="{
					height: 2,
					padding: 12,
					hoverRgbaColor: [51, 51, 51, 0.76],
				}"
				v-ripple
			></router-link> -->
			<div class="ccard__title-section">
				<h4 class="ccard__title">Название сборки</h4>
				<div class="ccard__likes-wrapper">
					<span>♥</span>
					<span>14</span>
				</div>
			</div>
			<div class="ccard__author-section">
				<UserAvatar class="ccard__pfp" />
				<div class="ccard__name-date-section">
					<span class="ccard__author"> Name </span>
					<span>•</span>
					<span class="ccard__date">14.10.2024</span>
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
import { defineComponent } from 'vue';
import IconBase from '../ui/icon/IconBase.vue';
import IconBookmark from '../ui/icon/icons/IconBookmark.vue';
import UserAvatar from '../shared/avatar/UserAvatar.vue';

export default defineComponent({
	components: { IconBase, IconBookmark, UserAvatar },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
