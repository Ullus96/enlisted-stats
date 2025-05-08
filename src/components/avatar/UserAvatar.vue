<template>
	<img
		v-if="!store.state.user.photoUrl"
		src="@/assets/avatar-skeleton.svg"
		alt="No avatar"
		class="avatar-placeholder"
	/>
	<img
		v-else-if="effectiveProvider === 'google'"
		:src="store.state.user.photoUrl"
		:alt="`${store.state.user.displayName} profile picture`"
		class="avatar-placeholder"
	/>
	<img
		v-else-if="effectiveProvider === 'gravatar'"
		:src="getGravatarUrl()"
		:alt="`${store.state.user.displayName} profile picture`"
		class="avatar-placeholder"
	/>
	<div
		v-else-if="effectiveProvider === 'none'"
		role="img"
		:aria-label="`${store.state.user.displayName} profile picture`"
		:style="avatarStyle"
		class="avatar-placeholder"
	>
		{{ getUsersFirstLetter() }}
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
	},
	setup(props) {
		const store = computed(() => useStore());

		const effectiveProvider = computed(() => {
			return props.temporaryProvider ?? store.value.state.user.avatarProvider;
		});

		function getGravatarUrl() {
			return `https://www.gravatar.com/avatar/${store.value.state.user.emailHash}?s=${props.imgSize}&d=identicon`;
		}

		function getUsersFirstLetter() {
			return store.value.state.user.displayName
				? store.value.state.user.displayName[0]
				: '';
		}

		const avatarColors: [string, string][] = [
			['#3498db', '#e2e2e2'], // синий
			['#1abc9c', '#e2e2e2'], // бирюза
			['#2ecc71', '#e2e2e2'], // зелёный
			['#f1c40f', '#232323'], // жёлтый
			['#e67e22', '#232323'], // оранжевый
			['#9b59b6', '#e2e2e2'], // фиолетовый
			['#16a085', '#e2e2e2'], // тёмная бирюза
			['#27ae60', '#e2e2e2'], // тёмно-зелёный
			['#2980b9', '#e2e2e2'], // тёмно-синий
			['#8e44ad', '#e2e2e2'], // тёмный фиолет
			['#f39c12', '#232323'], // янтарный
			['#d35400', '#e2e2e2'], // кирпичный
			['#7f8c8d', '#e2e2e2'], // серый
			['#34495e', '#e2e2e2'], // графит
			['#00b894', '#e2e2e2'], // морская волна
			['#6c5ce7', '#e2e2e2'], // индиго
		];

		function getAvatarColor(emailHash: string): [string, string] {
			const index = parseInt(emailHash.charAt(0), 16) % avatarColors.length;
			return avatarColors[index];
		}

		const avatarColor = computed(() =>
			getAvatarColor(store.value.state.user.emailHash)
		);

		const avatarStyle = computed(() => ({
			backgroundColor: avatarColor.value[0],
			color: avatarColor.value[1],
			aspectRatio: '1 / 1',
		}));

		return {
			store,
			effectiveProvider,
			getGravatarUrl,
			getUsersFirstLetter,
			getAvatarColor,
			avatarColor,
			avatarStyle,
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
