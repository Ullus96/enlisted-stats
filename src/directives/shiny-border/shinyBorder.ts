import { DirectiveBinding } from 'vue';

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const computedStyle = getComputedStyle(el);
		if (computedStyle.position === 'static') {
			el.style.position = 'relative';
		}

		const topBorder = document.createElement('span');
		const bottomBorder = document.createElement('span');

		[topBorder, bottomBorder].forEach((border) => {
			border.style.left = `${binding.value.padding || 12}px`;
			border.style.right = `${binding.value.padding || 12}px`;
			border.style.height = `${binding.value.height || 2}px`;
			border.style.opacity = '0';
		});

		topBorder.style.top = '0';
		topBorder.classList.add('shiny__top');
		bottomBorder.style.bottom = '0';
		bottomBorder.classList.add('shiny__bottom');

		el.appendChild(topBorder);
		el.appendChild(bottomBorder);

		let guardRailColor: string;
		if (
			binding.value.hoverRgbaColor &&
			Array.isArray(binding.value.hoverRgbaColor) &&
			binding.value.hoverRgbaColor.length == 4
		) {
			const [r, g, b, a] = binding.value.hoverRgbaColor;
			guardRailColor = `rgba(${r}, ${g}, ${b}, ${a})`;
		} else {
			guardRailColor = computedStyle.backgroundColor || 'transparent';
		}

		topBorder.style.setProperty('--guard-rail-color', guardRailColor);
		bottomBorder.style.setProperty('--guard-rail-color', guardRailColor);

		const getGradientColor = () => {
			if (
				binding.value.borderRgbaColor &&
				Array.isArray(binding.value.borderRgbaColor) &&
				binding.value.borderRgbaColor.length == 4
			) {
				const [r, g, b, a] = binding.value.borderRgbaColor;
				console.log(
					`binding.value.borderRgbaColor found! Using: rgba(${r}, ${g}, ${b}, ${a})`
				);
				return `rgba(${r}, ${g}, ${b}, ${a})`;
			}

			const computedStyle = getComputedStyle(document.documentElement);
			const color = computedStyle.getPropertyValue('--color-text-700');

			if (color) {
				console.log(`value isn't set, now using root ${color}`);
				return color;
			}

			return `rgb(116, 116, 116)`;
		};

		const createGradient = () => {
			return `linear-gradient(to right,	transparent var(--left-gradient-percent, 0%), ${getGradientColor()} 20%, transparent var(--right-gradient-percent, 40%))`;
		};

		let animationFrameId: number | null = null;
		let isFirstTrigger = true;

		const onMouseMove = (e: MouseEvent) => {
			if (!animationFrameId) {
				animationFrameId = requestAnimationFrame(() => {
					const rect = el.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					const elWidth = rect.right - rect.left;

					topBorder.style.transition =
						'opacity 0.2s ease, background-position 0.1s ease';
					bottomBorder.style.transition =
						'opacity 0.2s ease, background-position 0.1s ease';

					const minLeftX = Number(topBorder.style.left.split('px')[0]) || 0;
					const minRightX = Number(topBorder.style.right.split('px')[0]) || 0;

					const scalingFactor = rect.height / 1.35;
					const scaleIntensity = 0.75;

					const topIntensity =
						1 - Math.min(y / scalingFactor, 1) * scaleIntensity;
					const bottomIntensity =
						1 - Math.min((rect.height - y) / scalingFactor, 1) * scaleIntensity;

					topBorder.style.opacity = topIntensity.toFixed(2);
					bottomBorder.style.opacity = bottomIntensity.toFixed(2);

					const gradientPosition = `${x - rect.width * 0.2}px`;
					if (x > minLeftX && x < elWidth - minRightX) {
						if (isFirstTrigger) {
							isFirstTrigger = false;

							[bottomBorder, topBorder].forEach((border) => {
								border.style.background = createGradient();
								border.style.transition = 'opacity 0.2s ease';
							});

							setTimeout(() => {
								topBorder.style.transition =
									'opacity 0.2s ease, background-position 0.1s ease';
								bottomBorder.style.transition =
									'opacity 0.2s ease, background-position 0.1s ease';
							}, 100);
						}

						topBorder.style.backgroundPositionX = gradientPosition;
						bottomBorder.style.backgroundPositionX = gradientPosition;
					}

					const xPercent = (x / rect.width) * 100;

					if (xPercent > 50) {
						const ratio = (xPercent - 50) / 50;
						const newValue = Math.min(40 - ratio * (40 - 20) - 2, 40);

						[bottomBorder, topBorder].forEach((border) => {
							border.style.setProperty(
								'--right-gradient-percent',
								`${newValue}%`
							);
							border.style.setProperty('--left-gradient-percent', `${0}%`);
						});
					} else {
						const ratio = xPercent / 50;
						const newValue = 20 - ratio * 20;

						[bottomBorder, topBorder].forEach((border) => {
							border.style.setProperty('--right-gradient-percent', `${40}%`);
							border.style.setProperty(
								'--left-gradient-percent',
								`${newValue}%`
							);
						});
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
			isFirstTrigger = true;
			[bottomBorder, topBorder].forEach((border) => {
				border.style.opacity = '0';
				border.style.background = '';
				border.style.transition = '';
			});
		};

		el.addEventListener('mousemove', onMouseMove);
		el.addEventListener('mouseleave', onMouseLeave);

		// очистка при демонтировании
		(el as any)._cleanup = () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			el.removeEventListener('mousemove', onMouseMove);
			el.removeEventListener('mouseleave', onMouseLeave);
			el.removeChild(topBorder);
			el.removeChild(bottomBorder);
		};
	},

	unmounted(el: HTMLElement) {
		if ((el as any)._cleanup) {
			(el as any)._cleanup();
		}
	},
};
