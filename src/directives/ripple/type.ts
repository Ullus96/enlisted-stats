export interface IRippleBindingValue {
	color?: [number, number, number, number?];
	duration?: number;
	single?: boolean;
}

export interface INormalizedRippleValue {
	color: string; // строка вида rgba(r, g, b, a)
	duration: number;
	single: boolean;
}
