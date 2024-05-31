import { SkillTag } from '@/type/SkillTag';
import { items } from '@/data/soldiersList';
import { IItem } from '@/type/Item';

const tags: Record<SkillTag, string> = {
	base: 'Пехотинец',
	medic: 'Медик',
	engineer: 'Инженер',
	mortar: 'Миномётчик',
	flamethrower: 'Огнемётчик',
	pilot: 'Пилот',
	tank: 'Танкист',
	crew: 'Член экипажа',
	motorcycle: 'Мотоциклист',
	'apc-driver': 'Водитель БТР',
	'recon-crew': 'Член моб.экипажа',
	paratrooper: 'Десантник',
};

export function convertSkillTagToName(tag: SkillTag): string {
	return tags[tag];
}

export function getSoldierData(
	key: keyof IItem,
	value: string,
	returnKey: keyof IItem
) {
	const item = items.find((item) => item[key] === value);
	return item ? item[returnKey] : '';
}
