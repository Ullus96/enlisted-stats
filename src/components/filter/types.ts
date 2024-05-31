import { SoldierID } from '@/type/Soldier';

export interface IFilterParams {
	selectedClass: SoldierID | false;
	sortByID: string;
	sortByMethod: 'asc' | 'desc';
}
