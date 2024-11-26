import { Directive } from 'vue';

interface RippleOptions {
	color?: string;
	duration?: number;
}

const Ripple: Directive = {
	mounted(el, binding) {
		el.style.position = 'relative';
		el.style.overflow = 'hidden';
		const computedStyle = getComputedStyle(el);
		const textColorArray = computedStyle.color.split('(')[1].split(', ');

		function getTextRGBColors(arr: Array<String>) {
			return `${arr[0]}, ${arr[1]}, ${arr[2].slice(0, -1)}`;
		}

		el.addEventListener('mousedown', (event: MouseEvent) => {
			const ripple = document.createElement('div');

			// ripple options
			const options = {
				color:
					binding.value?.color ||
					`rgba(${getTextRGBColors(textColorArray)}, 0.1)`,
				duration: binding.value?.duration || 600,
			};

			// get ripple size
			const size = Math.max(el.offsetWidth, el.offsetHeight) * 2;

			// calculate position relative to the container
			const rect = el.getBoundingClientRect();
			const relativeX = event.clientX - rect.left; // X внутри контейнера
			const relativeY = event.clientY - rect.top; // Y внутри контейнера

			// setup ripple element
			ripple.style.position = 'absolute';
			ripple.style.width = ripple.style.height = `${size}px`;
			ripple.style.left = `${relativeX - size / 2}px`;
			ripple.style.top = `${relativeY - size / 2}px`;
			ripple.style.borderRadius = '50%';
			ripple.style.background = options.color;
			ripple.style.opacity = '0.6';
			ripple.style.transform = 'scale(0)';
			ripple.style.transition = `transform ${options.duration}ms ease, opacity ${options.duration}ms ease`;

			// Если у нас передан binding.single
			if (binding.value?.single) {
				el.querySelectorAll('.ripple-effect').forEach(
					(oldRipple: HTMLDivElement) => oldRipple.remove()
				);
			}

			ripple.classList.add('ripple-effect');
			el.appendChild(ripple);

			// start animation
			setTimeout(() => {
				ripple.style.transform = 'scale(1)';
				ripple.style.opacity = '0';
			}, 0);

			// cleanup
			setTimeout(() => {
				ripple.remove();
			}, options.duration);
		});
	},
};

export default Ripple;
