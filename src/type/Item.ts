export interface ISkills {
	key: string;
	title: string;
	link: string;
}

export interface IItem {
	name: string;
	id: string;
	lv1: [number, number, number];
	lv2: [number, number, number];
	lv3: [number, number, number];
	lv4: [number, number, number];
	lv5: [number, number, number];
	perk: string;
	skills?: ISkills[];
}
