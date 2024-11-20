<template>
	<span
		ref="container"
		class="highlight"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave"
	>
		<span class="highlight__top" ref="topBorder"></span>
		<span class="highlight__bottom" ref="bottomBorder"></span>
	</span>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';

export default defineComponent({
	setup(props) {
		// Main functionality
		const topBorder: Ref<null | HTMLSpanElement> = ref(null);
		const bottomBorder: Ref<null | HTMLSpanElement> = ref(null);
		const container: Ref<null | HTMLSpanElement> = ref(null);
		let animationFrameId: number | null = null;

		const onMouseMove = (e: MouseEvent) => {
			if (!animationFrameId) {
				animationFrameId = requestAnimationFrame(() => {
					if (topBorder.value && bottomBorder.value && container.value) {
						const rect = container.value.getBoundingClientRect();
						const x = e.clientX - rect.left;
						const y = e.clientY - rect.top;

						const topIntensity = 1 - Math.min(y / 60, 1);
						const bottomIntensity = 1 - Math.min((rect.height - y) / 60, 1);

						topBorder.value.style.opacity = topIntensity.toFixed(2);
						bottomBorder.value.style.opacity = bottomIntensity.toFixed(2);

						const gradientPosition = `${x - rect.width * 0.2}px`;
						topBorder.value.style.backgroundPositionX = gradientPosition;
						bottomBorder.value.style.backgroundPositionX = gradientPosition;
					}

					animationFrameId = null;
				});
			}
		};

		const onMouseLeave = () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
			if (topBorder.value && bottomBorder.value) {
				topBorder.value.style.opacity = '0';
				bottomBorder.value.style.opacity = '0';
			}
		};

		return { topBorder, bottomBorder, container, onMouseMove, onMouseLeave };
	},
});
</script>
