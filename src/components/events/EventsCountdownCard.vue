<template>
	<div class="event__countdown-card">
		<h2 class="event__countdown-time">{{ timerValue }}</h2>
		<p class="event__countdown-desc">{{ description }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
	props: {
		timerValue: { required: true, type: Number },
		index: {
			required: true,
			type: Number,
		},
	},
	setup(props) {
		const description = ref('');

		const getDeclension = (number: any, words: any) => {
			const cases = [2, 0, 1, 1, 1, 2];
			return words[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[Math.min(number % 10, 5)]
			];
		};

		const formatTime = () => {
			if (props.index === 0) {
				description.value = getDeclension(props.timerValue, [
					'час',
					'часа',
					'часов',
				]);
			} else if (props.index === 1) {
				description.value = getDeclension(props.timerValue, [
					'минута',
					'минуты',
					'минут',
				]);
			} else if (props.index === 2) {
				description.value = getDeclension(props.timerValue, [
					'секунда',
					'секунды',
					'секунд',
				]);
			}
		};

		watchEffect(() => {
			formatTime();
		});

		return {
			description,
		};
	},
});
</script>
