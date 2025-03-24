import { SoldierID } from '@/type/Soldier';

export interface IFilterParams {
	soldierClass: SoldierID | false;
	sortBy: sortByValues;
	order: 'asc' | 'desc';
}

export type sortByValues = 'likes' | 'date' | 'name';
