import { INormalizedRippleValue, IRippleBindingValue } from './type';

export function validateAndNormalizeBinding(
	value: Partial<IRippleBindingValue> = {},
	el: HTMLElement
): INormalizedRippleValue {
	const computedStyle = getComputedStyle(el);

	// дефолтный цвет (цвет текста с 10% прозрачности)
	const textColorArray = computedStyle.color.split('(')[1].split(', ');
	const getTextRGBColors = (arr: string[]) =>
		`${arr[0]}, ${arr[1]}, ${arr[2].slice(0, -1)}`;
	const defaultColor = `rgba(${getTextRGBColors(textColorArray)}, 0.1)`;

	// валидация rgba цвета
	const validateRgbaColor = (
		color: [number, number, number, number?] | undefined,
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
			const [r, g, b, a = 1] = color;
			return `rgba(${r}, ${g}, ${b}, ${a})`;
		}
		return defaultColor; // если цвет некорректен, возвращаем дефолт
	};

	// валидация длительности
	const validateDuration = (duration: number | undefined): number => {
		const defaultDuration = 600;
		if (typeof duration !== 'number' || duration <= 0) {
			return defaultDuration;
		}
		return duration;
	};

	// валидация single
	const validateSingle = (single: boolean | undefined): boolean => {
		return typeof single === 'boolean' ? single : false; // дефолт false
	};

	return {
		color: validateRgbaColor(value.color, defaultColor),
		duration: validateDuration(value.duration),
		single: validateSingle(value.single),
	};
}
