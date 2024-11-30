import { Directive } from 'vue';
import { validateAndNormalizeBinding } from './validation';

const Ripple: Directive = {
	mounted(el, binding) {
		const elemStyle = window.getComputedStyle(el);

		if (elemStyle.position !== 'absolute') {
			el.style.position = 'relative';
		}
		el.style.overflow = 'hidden';

		const options = validateAndNormalizeBinding(binding.value, el);

		el.addEventListener('mousedown', (event: MouseEvent) => {
			if (options.single && el.querySelector('.ripple-effect')) {
				return; // если single === true, блокируем новый ripple, пока старый не удалён
			}

			const ripple = document.createElement('div');
			const size = Math.max(el.offsetWidth, el.offsetHeight) * 2;

			const rect = el.getBoundingClientRect();
			const relativeX = event.clientX - rect.left;
			const relativeY = event.clientY - rect.top;

			ripple.style.position = 'absolute';
			ripple.style.width = ripple.style.height = `${size}px`;
			ripple.style.left = `${relativeX - size / 2}px`;
			ripple.style.top = `${relativeY - size / 2}px`;
			ripple.style.borderRadius = '50%';
			ripple.style.background = options.color;
			ripple.style.opacity = '0.6';
			ripple.style.transform = 'scale(0)';
			ripple.style.transition = `transform ${options.duration}ms ease, opacity ${options.duration}ms ease`;
			ripple.classList.add('ripple-effect');

			if (options.single) {
				el.querySelectorAll('.ripple-effect').forEach(
					(oldRipple: HTMLDivElement) => oldRipple.remove()
				);
			}

			el.appendChild(ripple);

			setTimeout(() => {
				ripple.style.transform = 'scale(1)';
				ripple.style.opacity = '0';
			}, 0);

			setTimeout(() => {
				ripple.remove();
			}, options.duration);
		});
	},
};

export default Ripple;
