<template>
	<div class="build__footer-wrapper">
		<UserAvatar
			:photo-u-r-l="photoURL"
			:display-name="displayName"
			:email-hash="emailHash"
			:avatar-provider="avatarProvider"
			class="build__avatar"
		/>
		<div class="build__footer-desc">
			<p class="build__author-name">
				{{ displayName || 'Пользователь не найден' }}
			</p>
			<div class="build__footer-dates-wrapper">
				<div class="build__footer-date-item">
					<span class="build__date">{{
						new Date(createdAt.seconds * 1000).toLocaleDateString() || '—'
					}}</span>
				</div>
				<div
					class="build__footer-date-item"
					v-if="updatedAt && !isSameDay(updatedAt, createdAt)"
				>
					<IconBase :width="12" :height="12"><IconPen /></IconBase>
					<span class="build__date">{{
						new Date(updatedAt.seconds * 1000).toLocaleDateString()
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Timestamp } from 'firebase/firestore';
import { defineComponent, PropType } from 'vue';
import UserAvatar from '@/components/avatar/UserAvatar.vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconPen from '@/components/ui/icon/icons/IconPen.vue';

export default defineComponent({
	components: { UserAvatar, IconBase, IconPen },
	props: {
		displayName: {
			type: String,
			default: null,
		},
		photoURL: {
			type: String,
			default: null,
		},
		emailHash: {
			type: String,
			default: null,
		},
		avatarProvider: {
			type: String as PropType<'google' | 'gravatar' | 'none' | null>,
			default: null,
		},
		createdAt: {
			type: Timestamp,
			default: null,
		},
		updatedAt: {
			type: Timestamp,
			default: null,
		},
	},
	setup() {
		function isSameDay(a: Timestamp, b: Timestamp) {
			const dateA = new Date(a.seconds * 1000);
			const dateB = new Date(b.seconds * 1000);

			return (
				dateA.getDate() === dateB.getDate() &&
				dateA.getMonth() === dateB.getMonth() &&
				dateA.getFullYear() === dateB.getFullYear()
			);
		}

		return { isSameDay };
	},
});
</script>
