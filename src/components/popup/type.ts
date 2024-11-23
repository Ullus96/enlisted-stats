export interface IPopUp {
	type: 'danger' | 'warning' | 'success' | '';
	title: string;
	desc: string;
	duration?: number;
	id?: number;
}
