<template>
	<div
		class="sbuild__icon-sub"
		:style="{
			left: left ? left : 0,
			top: top ? top : 0,
			opacity: opacity ? opacity : 0,
			transform: `scale(${scaleNum})`,
		}"
	>
		<svg
			width="20"
			height="16"
			viewBox="0 0 20 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="sbuild__likes-svg"
		>
			<path
				d="M9.62064 2.29822C9.71563 2.40892 9.85422 2.47262 10.0001 2.47262C10.146 2.47262 10.2846 2.40892 10.3795 2.29822C12.042 0.360759 14.697 -0.164272 16.7433 1.53117C18.8279 3.25825 19.0829 6.18754 17.4711 8.25512C16.761 9.16591 15.3047 10.6111 13.8175 12.0104C12.3398 13.4007 10.8626 14.7173 10.1329 15.3615C10.0911 15.3983 10.0585 15.4271 10.0298 15.4516C10.0158 15.4637 10.004 15.4736 9.99388 15.4818C9.96318 15.4567 9.92162 15.4203 9.85502 15.3615L9.85497 15.3615C9.12523 14.7173 7.64801 13.4007 6.17037 12.0104C4.68313 10.6111 3.22682 9.16591 2.51676 8.25513C0.90935 6.19323 1.19206 3.2793 3.24966 1.5268L2.92546 1.14615L3.24966 1.5268C5.25246 -0.179029 7.95452 0.35653 9.62064 2.29822Z"
				fill="transparent"
				stroke="#fff"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import randomNum from '@/functions/randomNum';

export default defineComponent({
	setup() {
		const left = ref('');
		const top = ref('');
		const scaleNum = ref(0);
		const opacity = ref(1);

		setTimeout(() => {
			left.value = randomNum(-100, 100) + '%';
			top.value = randomNum(-125, -25) + '%';
			scaleNum.value = randomNum(0.4, 0.85);
			opacity.value = 0;
		}, 50);

		return {
			left,
			top,
			scaleNum,
			opacity,
		};
	},
});
</script>
