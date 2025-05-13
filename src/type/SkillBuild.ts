import { Timestamp } from '@firebase/firestore';
import { SoldierID } from './Soldier';
import { SkillTag } from './SkillTag';

interface ITierSkill {
	skillKey: string;
	curLvl: number;
}

export interface ISkillBuild {
	data: {
		name: string;
		nameLowercase: string;
		author: string;
		createdAt: Timestamp;
		updatedAt: Timestamp;
		isCloned: boolean;
		isPublic: boolean;
		likedBy: string[];
	};
	soldierClass: SoldierID;
	tags: SkillTag[];
	stats: [number, number, number];
	skillsData: {
		mobility: {
			tier1: ITierSkill[];
			tier2: ITierSkill[];
			tier3: ITierSkill[];
		};
		vitality: {
			tier1: ITierSkill[];
			tier2: ITierSkill[];
			tier3: ITierSkill[];
		};
		weapon: {
			tier1: ITierSkill[];
			tier2: ITierSkill[];
			tier3: ITierSkill[];
		};
	};
}

export interface ISkillBuildWithID extends ISkillBuild {
	dbId: string;
	data: {
		name: string;
		nameLowercase: string;
		author: string;
		createdAt: Timestamp;
		updatedAt: Timestamp;
		isCloned: boolean;
		isPublic: boolean;
		likedBy: string[];
		likesAmount: number;
	};
}
