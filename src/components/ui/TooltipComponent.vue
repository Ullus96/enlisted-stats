<template>
	<div
		class="tooltip"
		:class="{
			dark: color === 'dark',
			top: direction === 'top',
			bottom: direction === 'bottom',
			right: direction === 'right',
			left: direction === 'left',
		}"
		:style="{ width: `${width}rem` }"
		ref="tooltip"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeUnmount,
	onMounted,
	PropType,
	Ref,
	ref,
} from 'vue';

export default defineComponent({
	props: {
		direction: {
			required: false,
			type: String as PropType<'top' | 'bottom' | 'right' | 'left'>,
			default: 'top',
		},
		width: {
			required: false,
			type: Number,
			default: 20,
		},
		color: {
			required: false,
			type: String as PropType<'normal' | 'dark'>,
			default: 'normal',
		},
	},
	setup(props) {
		const tooltip: Ref<HTMLElement | null> = ref(null);

		const adjustPosition = () => {
			const tooltipElement = tooltip.value;
			if (tooltipElement) {
				const rect = tooltipElement.getBoundingClientRect();

				let viewportWidth = window.outerWidth;
				if (window.innerWidth <= window.outerWidth) {
					viewportWidth = window.innerWidth;
				}

				if (viewportWidth < rect.width / 2 || viewportWidth - 80 < rect.width) {
					tooltipElement.style.width = `${
						viewportWidth - 20 - viewportWidth / 2
					}px`;
					tooltipElement.style.transform = 'translate(-50%, -100%)';
					tooltipElement.style.setProperty('--tooltip-arrow-position', '50%');
				}

				if (rect.left < 40 && rect.right > viewportWidth - 40) {
					tooltipElement.style.width = `${rect.width - 40}px`;
					tooltipElement.style.transform = 'translate(-50%, -100%)';
					tooltipElement.style.setProperty('--tooltip-arrow-position', '50%');
				}

				if (rect.left < 20 || (viewportWidth > 1024 && rect.left < 92)) {
					tooltipElement.style.transform = 'translate(-20%, -100%)';
					tooltipElement.style.setProperty('--tooltip-arrow-position', '20%');
				} else if (rect.right > viewportWidth - 20) {
					tooltipElement.style.transform = 'translate(-80%, -100%)';
					tooltipElement.style.setProperty('--tooltip-arrow-position', '80%');
				}
			}
		};

		onMounted(() => {
			if (props.direction === 'top' || props.direction === 'bottom') {
				adjustPosition();
				window.addEventListener('resize', adjustPosition);
			}
		});

		onBeforeUnmount(() => {
			if (props.direction === 'top' || props.direction === 'bottom') {
				window.removeEventListener('resize', adjustPosition);
			}
		});

		return {
			tooltip,
			adjustPosition,
		};
	},
});
</script>
