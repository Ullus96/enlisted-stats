import { IAvaliableTagsItems } from '@/type/CCTags';

export const avaliableTags: IAvaliableTagsItems = {
	base: {
		name: 'Пехотинец',
		desc: 'Используется всеми пехотинцами. Добавляет разные навыки, типа контроля отдачи и некоторые другие.',
		users: [
			'rifleman',
			'medic',
			'assaulter',
			'engineer',
			'sniper',
			'antitank',
			'mg',
			'radio',
			'mortar',
			'flamethrower',
			'paratrooper',
		],
	},
	medic: {
		name: 'Медик',
		desc: 'Добавляет медицинские навыки, связанные со способностями медика.',
		users: ['medic'],
	},
	engineer: {
		name: 'Инженер',
		desc: 'Добавляет инженерные навыки, связанные со способностями инженера.',
		users: ['engineer'],
	},
	mortar: {
		name: 'Миномётчик',
		desc: 'Добавляет способность, увеличивающую количество боеприпасов миномёта.',
		users: ['mortar'],
	},
	flamethrower: {
		name: 'Огнемётчик',
		desc: 'Добавляет способность, увеличивающую количество топлива огнемёта.',
		users: ['flamethrower'],
	},
	paratrooper: {
		name: 'Десантник',
		desc: 'Добавляет навык жёсткого приземления.',
		users: ['paratrooper'],
	},
	pilot: {
		name: 'Пилот',
		desc: 'Добавляет навыки, связанные с пилотированием, например: лётная выносливость, сопротивление блэкауту, обнаружение самолётов.',
		users: ['pilot-fighter', 'pilot-attacker'],
	},
	crew: {
		name: 'Член экипажа',
		desc: 'Вспомогательный тэг, необходимый для навыков танкиста.',
		users: ['tank'],
	},
	tank: {
		name: 'Танкист',
		desc: 'Основной набор навыков танкиста',
		users: ['tank'],
	},
	'recon-crew': {
		name: 'Член моб. экипажа',
		desc: 'Вспомогательный тэг, необходимый для боевых навыков мотоциклистов и водителей БТР.',
		users: ['moto', 'apc-driver'],
	},
	motorcycle: {
		name: 'Мотоциклист',
		desc: 'Добавляет навыки, связанные с вождением и починкой.',
		users: ['moto'],
	},
	'apc-driver': {
		name: 'Водитель БТР',
		desc: 'Добавляет навыки, связанные с вождением и починкой.',
		users: ['apc-driver'],
	},
};
