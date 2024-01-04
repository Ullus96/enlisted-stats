import { SoldierName } from './SoldierName';

export interface ICCTagEntity {
	name: string;
	desc: string;
	users: SoldierName[];
}

export interface IAvaliableTagsItems {
	[key: string]: ICCTagEntity;
}
