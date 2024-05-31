import { SoldierName } from './Soldier';

export interface ICCTagEntity {
	name: string;
	desc: string;
	users: SoldierName[];
}

export interface IAvaliableTagsItems {
	[key: string]: ICCTagEntity;
}
