import { RgbaColor, IBindingValue, INormalizedBindingValue } from './type';

export function validateAndNormalizeBinding(
	value: Partial<IBindingValue>,
	el: HTMLElement
): Required<INormalizedBindingValue> {
	const rect = el.getBoundingClientRect();

	const validatePadding = (padding: number | undefined): number => {
		const defaultPadding = 12;
		if (
			typeof padding !== 'number' ||
			padding <= 0 ||
			padding >= rect.width / 2
		) {
			return defaultPadding;
		}
		return padding;
	};

	const validateHeight = (height: number | undefined): number => {
		const defaultHeight = 2;
		if (typeof height !== 'number' || height <= 0 || height > rect.height / 2) {
			return defaultHeight;
		}
		return height;
	};

	const validateRgbaColor = (
		color: RgbaColor | undefined,
		defaultColor: string
	): string => {
		if (
			Array.isArray(color) &&
			color.length >= 3 &&
			color.length <= 4 &&
			color
				.slice(0, 3)
				.every((n) => typeof n === 'number' && n >= 0 && n <= 255) &&
			(typeof color[3] === 'undefined' ||
				(typeof color[3] === 'number' && color[3] >= 0 && color[3] <= 1))
		) {
			const [r, g, b, a = 1] = color; // если alpha не задана, то = 1
			return `rgba(${r}, ${g}, ${b}, ${a})`;
		}
		return defaultColor; // если проверка провалилась, вернуть дефолт
	};

	const computedStyle = getComputedStyle(el);
	const defaultHoverColor = computedStyle.backgroundColor || 'transparent';
	const defaultBorderColor =
		computedStyle.getPropertyValue('--color-text-700') || 'rgb(116, 116, 116)';

	return {
		padding: validatePadding(value.padding),
		height: validateHeight(value.height),
		hoverRgbaColor: validateRgbaColor(value.hoverRgbaColor, defaultHoverColor),
		borderRgbaColor: validateRgbaColor(
			value.borderRgbaColor,
			defaultBorderColor
		),
	};
}
