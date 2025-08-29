<template>
	<transition name="stamp">
		<div
			class="event__stamp-wrapper"
			:style="{
				top: randomizedPosition.top,
				left: randomizedPosition.left,
				rotate: `z ${randomizedPosition.rotate}`,
			}"
		>
			<div class="event__stamp" :class="`event__stamp--${text}`">
				<p class="event__text">{{ stampText }}</p>
				<div class="event__border event__border--outer"></div>
				<div class="event__border event__border--inner"></div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import randomBetween from '@/functions/randomBetween';

export default defineComponent({
	props: {
		text: {
			required: true,
			type: String as PropType<'pass' | 'fail'>,
			default: 'fail',
		},
	},
	setup(props) {
		const stampText = computed(() => {
			return props.text === 'fail' ? '⨉' : '✔';
		});

		const randomizedPosition = computed(() => {
			return {
				top: `${randomBetween(1.4, 5.2).toFixed(2)}rem`,
				left: `calc(50% + ${randomBetween(-0.6, 0.6).toFixed(2)}rem)`,
				rotate: `${randomBetween(-9, 9).toFixed(2)}deg`,
			};
		});

		return { stampText, randomizedPosition };
	},
});
</script>

<style scoped>
.stamp-enter-from,
.stamp-leave-to {
	opacity: 0;
}

.stamp-enter-active,
.stamp-leave-active {
	transition: opacity 0.5s ease;
}
</style>
