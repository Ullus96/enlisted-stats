<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:viewBox="viewBox"
		:aria-labelledby="iconName"
		role="presentation"
	>
		<title :id="iconName" lang="en">{{ iconName }} icon</title>
		<g :fill="iconColor">
			<slot />
		</g>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		iconName: {
			type: String,
			default: 'cog',
		},
		width: {
			type: [Number, String],
			default: 16,
		},
		height: {
			type: [Number, String],
			default: 16,
		},
		viewBox: {
			type: String,
			default: '0 0 16 16',
		},
		iconColor: {
			type: String,
			default: 'currentColor',
		},
	},
	setup() {},
});
</script>
