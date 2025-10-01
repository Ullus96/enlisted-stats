<template>
	<section class="ccard">
		<div class="ccard__main">
			<!-- сюда линк -->
			<div class="ccard__title-section">
				<h4 class="ccard__title">Название сборки</h4>
				<div class="ccard__likes-wrapper">
					<span>♥</span>
					<span>14</span>
				</div>
			</div>
			<div class="ccard__author-section">
				<UserAvatar />
				<div class="ccard__name-date-section">
					<span class="ccard__author"> Name </span>
					<span>•</span>
					<span class="ccard__date">14.10.2024</span>
				</div>
			</div>
		</div>
		<div class="ccard__pin">
			<IconBase>
				<IconBookmark />
			</IconBase>
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
