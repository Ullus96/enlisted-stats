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

  4. colorClass: string
  Название класса, которое нужно добавить в _shiny-border.scss
  Во-первых, выбрать акцентный цвет,
  Во-вторых, заглушки по краям работают посредством получения
  цвета @hovered состояния: mix($text-color, $bg-color, 4%).
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

						const scalingFactor = rect.height / 1.35; // нормализуем "зону свечения" (1/1.35 высоты элемента)
						const scaleIntensity = 0.75;

						const topIntensity =
							1 - Math.min(y / scalingFactor, 1) * scaleIntensity;
						const bottomIntensity =
							1 -
							Math.min((rect.height - y) / scalingFactor, 1) * scaleIntensity;

						topBorder.value.style.opacity = topIntensity.toFixed(2);
						bottomBorder.value.style.opacity = bottomIntensity.toFixed(2);

						const gradientPosition = `${x - rect.width * 0.2}px`;
						topBorder.value.style.backgroundPositionX = gradientPosition;
						bottomBorder.value.style.backgroundPositionX = gradientPosition;

						const xPercent = (x / rect.width) * 100;

						if (xPercent > 50) {
							const ratio = (xPercent - 50) / 50;
							const newValue = 40 - ratio * (40 - 20);

							topBorder.value.style.setProperty(
								'--right-gradient-percent',
								`${newValue}%`
							);
							bottomBorder.value.style.setProperty(
								'--right-gradient-percent',
								`${newValue}%`
							);
							topBorder.value.style.setProperty(
								'--left-gradient-percent',
								`${0}%`
							);
							bottomBorder.value.style.setProperty(
								'--left-gradient-percent',
								`${0}%`
							);
						} else {
							const ratio = xPercent / 50;
							const newValue = 20 - ratio * 20;
							topBorder.value.style.setProperty(
								'--right-gradient-percent',
								`${40}%`
							);
							bottomBorder.value.style.setProperty(
								'--right-gradient-percent',
								`${40}%`
							);
							topBorder.value.style.setProperty(
								'--left-gradient-percent',
								`${newValue}%`
							);
							bottomBorder.value.style.setProperty(
								'--left-gradient-percent',
								`${newValue}%`
							);
						}
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
