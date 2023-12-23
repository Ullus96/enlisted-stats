import { SkillBranch } from '@/type/Skills';

const skillsList: SkillBranch[] = [
	// ---------------
	// Mobility
	// ---------------
	{
		tier1: [
			{
				name: 'jump-height',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'максимальная высота прыжка',
				curLvl: 1,
				maxLvl: 2,
				costPerLvl: 2,
				progression: ['+20%', '+40%'],
			},
			{
				name: 'extinguish-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость тушения огня на солдате',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+100%'],
			},
		],

		tier2: [
			{
				name: 'healing-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость использования аптечки',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 3,
				progression: ['+25%', '+50%', '+75%'],
			},
			{
				name: 'run-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость бега',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['+5%', '+10%'],
			},
		],

		tier3: [
			{
				name: 'sprint-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость спринта',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+15%'],
			},
			{
				name: 'building-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'engineer',
				desc: 'скорость постройки',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 3,
				progression: ['+12.5%', '+25%', '37.5%', '+50%'],
			},
		],
	},

	// ---------------
	// Vitality
	// ---------------
	{
		tier1: [
			{
				name: 'breath-hold',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'времени задержки дыхания при прицеливании',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 1,
				progression: ['+33.3%', '+66.6%', '+100%'],
			},
			{
				name: 'endurance-regeneration-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость восстановления выносливости',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+100%'],
			},
		],

		tier2: [
			{
				name: 'healing-amount',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'восстановления здоровья аптечкой',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+100%', '+200%'],
			},
			{
				name: 'building-resources',
				icon: 'https://placehold.it/200x200',
				tag: 'engineer',
				desc: 'ресурсов для построек',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 2,
				progression: ['+10%', '+20%', '+30%', '+40%'],
			},
		],

		tier3: [
			{
				name: 'additional-hp',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'живучести',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+35%'],
			},
		],
	},

	// ---------------
	// Weapon Handling
	// ---------------
	{
		tier1: [
			{
				name: 'bullet-spread',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: '1.Разброс пуль после резкого разворота; 2.Скорость уменьшения разброса после резкого разворота',
				curLvl: 2,
				maxLvl: 2,
				costPerLvl: 1,
				progression: ['-12.5% | +7.5%', '-25% | +15%'],
			},
			{
				name: 'change-weapon-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость смены оружия',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+50%'],
			},
			{
				name: 'throwing-range',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'дальность броска гранат',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['+25%', '+50%'],
			},
		],

		tier2: [
			{
				name: 'vertical-recoil',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'вертикальной отдачи при стрельбе из ручного оружия',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 3,
				progression: ['-10%', '-20%', '-30%', '-40%'],
			},
			{
				name: 'reloading-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'скорость перезарядки ручного оружия',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+6%', '+12%'],
			},
		],

		tier3: [
			{
				name: 'healing-speed',
				icon: 'https://placehold.it/200x200',
				tag: 'base',
				desc: 'горизонтальной отдачи при стрельбе из ручного оружия',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['-30%'],
			},
			{
				name: 'tank-accuracy',
				icon: 'https://placehold.it/200x200',
				tag: 'tank',
				desc: 'Улучшенные навыки наведения танкового орудия (навык наводчика)',
				curLvl: 1,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['✓'],
			},
		],
	},
];

export default skillsList;
