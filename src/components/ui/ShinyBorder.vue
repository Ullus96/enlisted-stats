<docs>
Предварительные требования:
  - Родитель должен иметь position: relative
  - Монтируется сразу после родительского элемента

Props:
  1. zIndex: true / false
  Определяет, перекрывает ли этот элемент собой весь остальной контент.
  Если да - нельзя будет выделять текст, но @mousemove будет
  отрабатывать, независимо от того, где у нас мышка (а не только
  на фоне)

  2. height: any number
  Высота рамки, преобразуется в пиксели.

  3. padding: any number
  Расстояние от края, преобразуется в пиксели
</docs>

<template>
	<span
		ref="container"
		class="shiny"
		:class="$props.colorClass"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave"
	>
		<span class="shiny__top" ref="topBorder"></span>
		<span class="shiny__bottom" ref="bottomBorder"></span>
	</span>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		zIndex: {
			type: Boolean,
			required: false,
			default: false,
		},
		height: {
			type: Number,
			required: false,
			default: 2,
		},
		padding: {
			type: Number,
			required: false,
			default: 12,
		},
		colorClass: {
			type: String,
			required: false,
			default: 'shiny--table',
		},
	},
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

		// Setting up props
		onMounted(() => {
			if (topBorder.value && bottomBorder.value) {
				topBorder.value.style.height = `${props.height}px`;
				bottomBorder.value.style.height = `${props.height}px`;

				topBorder.value.style.left = `${props.padding}px`;
				topBorder.value.style.right = `${props.padding}px`;
				bottomBorder.value.style.left = `${props.padding}px`;
				bottomBorder.value.style.right = `${props.padding}px`;
			}

			if (container.value) {
				container.value.style.zIndex = String(Number(props.zIndex));
			}
		});

		return { topBorder, bottomBorder, container, onMouseMove, onMouseLeave };
	},
});
</script>
