<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:viewBox="viewBox"
		role="presentation"
		ref="svgRef"
	>
		<g :fill="iconColor">
			<slot />
		</g>
	</svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	props: {
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
	setup(props) {
		const svgRef = ref<SVGElement | null>(null);

		onMounted(() => {
			const paths = svgRef.value?.querySelectorAll('path');
			if (paths) {
				paths.forEach((path) => {
					path.setAttribute('fill', props.iconColor);
				});
			}
		});

		return { svgRef };
	},
});
</script>
