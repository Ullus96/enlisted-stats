export type RgbaColor = [number, number, number, number?];

export interface IBindingValue {
	padding?: number;
	height?: number;
	hoverRgbaColor?: RgbaColor;
	borderRgbaColor?: RgbaColor;
}

export interface INormalizedBindingValue {
	padding: number;
	height: number;
	hoverRgbaColor: string;
	borderRgbaColor: string;
}
