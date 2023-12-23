import { SkillTag } from './SkillTag';

export interface SkillEntity {
	name: string;
	icon: string;
	tag: SkillTag;
	desc: string;
	curLvl: number;
	maxLvl: number;
	costPerLvl: number;
	progression: string[];
}

export interface SkillBranch {
	tier1: SkillEntity[];
	tier2: SkillEntity[];
	tier3: SkillEntity[];
}
