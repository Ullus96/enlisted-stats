<template>
	<img
		v-if="!finalPhotoURL && effectiveProvider !== 'none'"
		src="@/assets/avatar-skeleton.svg"
		alt="No avatar"
		class="avatar-placeholder"
	/>
	<img
		v-else-if="effectiveProvider === 'google'"
		:src="finalPhotoURL"
		:alt="`${finalDisplayName} profile picture`"
		class="avatar-placeholder"
	/>
	<img
		v-else-if="effectiveProvider === 'gravatar'"
		:src="gravatarUrl"
		:alt="`${finalDisplayName} profile picture`"
		class="avatar-placeholder"
	/>
	<div
		v-else-if="effectiveProvider === 'none'"
		role="img"
		:aria-label="`${finalDisplayName} profile picture`"
		:style="avatarStyle"
		class="avatar-placeholder"
	>
		{{ firstLetter }}
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import { useStore } from '@/store/useStore';

export default defineComponent({
	props: {
		temporaryProvider: {
			required: false,
			default: null,
			type: String as PropType<'google' | 'gravatar' | 'none' | null>,
		},
		imgSize: {
			required: false,
			default: 128,
			type: Number,
		},
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
	},
	setup(props) {
		const store = useStore();

		const effectiveProvider = computed(() => {
			return (
				props.temporaryProvider ??
				props.avatarProvider ??
				store.state.user.avatarProvider
			);
		});

		const finalPhotoURL = computed(() => {
			return props.photoURL ?? store.state.user.photoUrl;
		});

		const finalDisplayName = computed(() => {
			return props.displayName ?? store.state.user.displayName ?? '';
		});

		const finalEmailHash = computed(() => {
			return props.emailHash ?? store.state.user.emailHash ?? '';
		});

		const gravatarUrl = computed(() => {
			return `https://www.gravatar.com/avatar/${finalEmailHash.value}?s=${props.imgSize}&d=identicon`;
		});

		const avatarColors: [string, string][] = [
			['#3498db', '#e2e2e2'],
			['#1abc9c', '#e2e2e2'],
			['#2ecc71', '#e2e2e2'],
			['#f1c40f', '#232323'],
			['#e67e22', '#232323'],
			['#9b59b6', '#e2e2e2'],
			['#16a085', '#e2e2e2'],
			['#27ae60', '#e2e2e2'],
			['#2980b9', '#e2e2e2'],
			['#8e44ad', '#e2e2e2'],
			['#f39c12', '#232323'],
			['#d35400', '#e2e2e2'],
			['#7f8c8d', '#e2e2e2'],
			['#34495e', '#e2e2e2'],
			['#00b894', '#e2e2e2'],
			['#6c5ce7', '#e2e2e2'],
		];

		const getAvatarColor = (hash: string): [string, string] => {
			const index = parseInt(hash.charAt(0), 16) % avatarColors.length;
			return avatarColors[index];
		};

		const avatarColor = computed(() => getAvatarColor(finalEmailHash.value));

		const avatarStyle = computed(() => ({
			backgroundColor: avatarColor.value[0],
			color: avatarColor.value[1],
			aspectRatio: '1 / 1',
		}));

		const firstLetter = computed(() =>
			finalDisplayName.value ? finalDisplayName.value[0].toUpperCase() : ''
		);

		return {
			effectiveProvider,
			finalPhotoURL,
			finalDisplayName,
			gravatarUrl,
			avatarStyle,
			firstLetter,
		};
	},
});
</script>

<style scoped>
.avatar-placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	text-transform: uppercase;
	user-select: none;
	font-size: 1rem;
	overflow: hidden;
}
</style>
