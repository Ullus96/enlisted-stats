export default function randomNum(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
