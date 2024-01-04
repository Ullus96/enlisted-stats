export interface ISkills {
	key: string;
	title: string;
	link: string;
}

import { SkillTag } from '@/type/SkillTag';
export interface IItem {
	name: string;
	id: string;
	icon: string;
	tags: SkillTag[];
	statsMod: [number, number, number];
	perk: string;
	skills?: ISkills[];
}

// export interface IItem {
// 	name: string;
// 	id: string;
// 	tags: SkillTag[];
// 	lv1: [number, number, number];
// 	lv2: [number, number, number];
// 	lv3: [number, number, number];
// 	lv4: [number, number, number];
// 	lv5: [number, number, number];
// 	perk: string;
// 	skills?: ISkills[];
// }
