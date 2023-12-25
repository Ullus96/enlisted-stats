import { SkillTag } from './SkillTag';

export interface SkillEntity {
	icon: string;
	tags: SkillTag[];
	desc: string;
	curLvl: number;
	maxLvl: number;
	costPerLvl: number;
	progression: string[];
}

export interface SkillTier {
	[key: string]: SkillEntity;
}

export interface SkillBranch {
	tier1: SkillTier;
	tier2: SkillTier;
	tier3: SkillTier;
}
