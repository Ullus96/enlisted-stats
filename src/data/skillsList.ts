import { SkillBranch } from '@/type/Skills';

const skillsList: SkillBranch[] = [
	{
		tier1: {
			jumpHeight: {
				icon: 'mobility/tier1/jump-height.svg',
				tags: ['base'],
				desc: 'максимальная высота прыжка',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 2,
				progression: ['+20%', '+40%'],
			},
			crouchProneSpeed: {
				icon: 'mobility/tier1/crouch-prone-speed.svg',
				tags: ['base'],
				desc: 'скорость при движении лёжа или в приседе',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 1,
				progression: ['+20%', '+40%', '+60%'],
			},
			extinguishSpeed: {
				icon: 'mobility/tier1/extinguish-speed.svg',
				tags: ['base'],
				desc: 'скорость тушения огня на солдате',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+100%'],
			},
			bodyPosition: {
				icon: 'mobility/tier1/body-position.svg',
				tags: ['base'],
				desc: 'скорость изменения положения тела',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+50%'],
			},
			medicHealingSpeed: {
				icon: 'mobility/tier1/medic-healing-speed.svg',
				tags: ['medic'],
				desc: 'скорость лечения союзников',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 2,
				progression: ['+25%', '+50%'],
			},
			changeSeatSpeed: {
				icon: 'mobility/tier1/change-seat-speed.svg',
				tags: ['tank'],
				desc: 'скорость посадки, выхода и смены места в технике',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 1,
				progression: ['+15%', '+30%'],
			},
			landingDamage: {
				icon: 'mobility/tier1/landing-damage.svg',
				tags: ['pilot'],
				desc: 'урон при жестком приземлении с парашютом',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 2,
				progression: ['-20%', '-40%', '-60%'],
			},
			brakeSpeed: {
				icon: 'mobility/tier1/brake-speed.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'скорость нажатия на тормоза (навык водителя)',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 2,
				progression: ['+25%', '+50%'],
			},
			gearboxSaveSpeed: {
				icon: 'mobility/tier1/gearbox-save-speed.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'потери скорости при переключении передач (навык водителя)',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 1,
				progression: ['-33.3%', '-66.6%', '-100%'],
			},
		},
		tier2: {
			healingSpeed: {
				icon: 'mobility/tier2/healing-speed.svg',
				tags: ['base'],
				desc: 'скорость использования аптечки',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 3,
				progression: ['+25%', '+50%', '+75%'],
			},
			climbingSpeed: {
				icon: 'mobility/tier2/climbing-speed.svg',
				tags: ['base'],
				desc: 'скорость залезания на объекты',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 2,
				progression: ['+25%', '+50%', '+75%', '+100%'],
			},
			aimingSpeed: {
				icon: 'mobility/tier2/aiming-speed.svg',
				tags: ['base'],
				desc: 'скорость прицеливания из оружия',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 5,
				progression: ['+10%', '+20%'],
			},
			runningSpeed: {
				icon: 'mobility/tier2/running-speed.svg',
				tags: ['base'],
				desc: 'скорость бега',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['+5%', '+10%'],
			},
			vehicleExtinguish: {
				icon: 'mobility/tier2/vehicle-extinguish.svg',
				tags: ['tank'],
				desc: 'скорость тушения техники',
				curLvl: 0,
				maxLvl: 5,
				costPerLvl: 1,
				progression: ['+6%', '+12%', '+18%', '+24%', '+30%'],
			},
			gearboxShiftSpeed: {
				icon: 'mobility/tier2/gearbox-shift-speed.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'скорость переключения передач (навык водителя)',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+45%', '+90%'],
			},
			repairSpeed: {
				icon: 'mobility/tier2/repair-speed.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'скорость починки техники',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 3,
				progression: ['+10%', '+20%', '+30%'],
			},
		},
		tier3: {
			sprintSpeed: {
				icon: 'mobility/tier3/sprint-speed.svg',
				tags: ['base'],
				desc: 'скорость спринта',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+15%'],
			},
			buildingSpeed: {
				icon: 'mobility/tier3/building-speed.svg',
				tags: ['engineer'],
				desc: 'скорость постройки',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 3,
				progression: ['+12.5%', '+25%', '37.5%', '+50%'],
			},
			headShaking: {
				icon: 'mobility/tier3/head-shaking.svg',
				tags: ['pilot'],
				desc: 'эффект качания головой при резких манёврах',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 14,
				progression: ['-100%'],
			},
			shellProgress: {
				icon: 'mobility/tier3/shell-progress.svg',
				tags: ['tank'],
				desc: 'смена типа снаряда без потери прогресса перезарядки (навык заряжающего)',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['✓'],
			},
		},
	},

	// ---------------
	// ---------------
	// ---------------
	// Vitality
	// ---------------
	// ---------------
	// ---------------
	{
		tier1: {
			passiveHealing: {
				icon: 'vitality/tier1/passive-healing.svg',
				tags: ['base'],
				desc: '1.Количество восстанавливаемого здоровья вне боя; 2.Скорость восстановления здоровья вне боя',
				curLvl: 0,
				maxLvl: 5,
				costPerLvl: 1,
				progression: [
					'+20%,+10%',
					'+40%,+20%',
					'+60%,+30%',
					'+80%,+40%',
					'+100%,+50%',
				],
			},
			contusionResist: {
				icon: 'vitality/tier1/contusion-resist.svg',
				tags: ['base'],
				desc: '1.Эффект тряски головы, вызванный близкими взрывами; 2.Длительность контузии',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 2,
				progression: ['-25%,-12.5%', '-50%,-25%'],
			},
			breathHold: {
				icon: 'vitality/tier1/breath-hold.svg',
				tags: ['base'],
				desc: 'времени задержки дыхания при прицеливании',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 1,
				progression: ['+33.3%', '+66.6%', '+100%'],
			},
			enduranceRegenerationSpeed: {
				icon: 'vitality/tier1/endurance-regeneration-speed.svg',
				tags: ['base'],
				desc: 'скорость восстановления выносливости',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+100%'],
			},
			pilotEnduranceSpeed: {
				icon: 'vitality/tier1/pilot-endurance-speed.svg',
				tags: ['pilot'],
				desc: 'скорость восстановления лётной выносливости',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+100%'],
			},
			healingBagAmount: {
				icon: 'vitality/tier1/healing-bag-amount.svg',
				tags: ['medic'],
				desc: 'использований медицинской сумки',
				curLvl: 0,
				maxLvl: 5,
				costPerLvl: 1,
				progression: ['+20%', '+40%', '+60%', '+80%', '+100%'],
			},
		},
		tier2: {
			blackoutControl: {
				icon: 'vitality/tier2/blackout-control.svg',
				tags: ['pilot'],
				desc: 'эффект потери контроля при наступлении блэкаута при перегрузках',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['-10%', '-20%'],
			},
			damageStability: {
				icon: 'vitality/tier2/damage-stability.svg',
				tags: ['base'],
				desc: 'стабильность прицела ручного оружия при получении повреждений',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 2,
				progression: ['+20%', '+40%', '+60%', '+80%'],
			},
			healingAmount: {
				icon: 'vitality/tier2/healing-amount.svg',
				tags: ['base'],
				desc: 'восстановления здоровья аптечкой',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+100%', '+200%'],
			},
			pilotEnduranceAmount: {
				icon: 'vitality/tier2/pilot-endurance-amount.svg',
				tags: ['pilot'],
				desc: 'лётной выносливости',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 3,
				progression: ['+7%', '+14%', '+21%'],
			},
			enduranceAmount: {
				icon: 'vitality/tier2/endurance-amount.svg',
				tags: ['base'],
				desc: 'выносливости',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 2,
				progression: ['+33.3%', '+66.6%', '+100%'],
			},
			teammateHealingAmount: {
				icon: 'vitality/tier2/teammate-healing-amount.svg',
				tags: ['medic'],
				desc: 'восстановления здоровья при лечении союзников',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 3,
				progression: ['+66.6%', '+133.3%', '+200%'],
			},
			buildingResources: {
				icon: 'vitality/tier2/building-resources.svg',
				tags: ['engineer'],
				desc: 'ресурсов для построек',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 2,
				progression: ['+10%', '+20%', '+30%', '+40%'],
			},
		},
		tier3: {
			additionalHp: {
				icon: 'vitality/tier3/additional-hp.svg',
				tags: ['base'],
				desc: 'живучести',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+35%'],
			},
			overGTraining: {
				icon: 'vitality/tier3/over-g-training.svg',
				tags: ['pilot'],
				desc: '1.Выносимых положительных перегрузок; 2.Выносимых отрицательных перегрузок',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+15%,+30%'],
			},
		},
	},

	// ---------------
	// ---------------
	// ---------------
	// Weapon Handling
	// ---------------
	// ---------------
	// ---------------
	{
		tier1: {
			bulletSpread: {
				icon: 'weapon/tier1/bullet-spread.svg',
				tags: ['base'],
				desc: '1.Разброс пуль после резкого разворота; 2.Скорость уменьшения разброса после резкого разворота',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 1,
				progression: ['-12.5%,+7.5%', '-25%,+15%'],
			},
			changeWeaponSpeed: {
				icon: 'weapon/tier1/change-weapon-speed.svg',
				tags: ['base'],
				desc: 'скорость смены оружия',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 1,
				progression: ['+50%'],
			},
			throwingRange: {
				icon: 'weapon/tier1/throwing-range.svg',
				tags: ['base'],
				desc: 'дальность броска гранат',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['+25%', '+50%'],
			},
			repairToolsAmount: {
				icon: 'weapon/tier1/repair-tools-amount.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'к количеству использований ремкомплекта',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 3,
				progression: ['+50%', '+100%'],
			},
			meleeDamage: {
				icon: 'weapon/tier1/melee-damage.svg',
				tags: ['base'],
				desc: '1.Урона в ближнем бою; 2.Скорости атаки в ближнем бою',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 1,
				progression: ['+25%,+5%', '+50%,+10%', '+75%,+15%', '+100%,+20%'],
			},
			focusAngle: {
				icon: 'weapon/tier1/focus-angle.svg',
				tags: ['pilot'],
				desc: 'угол сфокусированного и периферийного зрения',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 2,
				progression: ['+7.5%', '+15%', '+22.5%', '+30%'],
			},
			firstAidKitsInCrateAmount: {
				icon: 'weapon/tier1/first-aid-kits-in-crate-amount.svg',
				tags: ['medic'],
				desc: 'аптечек в ящике с аптечками',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 2,
				progression: ['+15%', '+30%', '+45%'],
			},
		},
		tier2: {
			verticalRecoil: {
				icon: 'weapon/tier2/vertical-recoil.svg',
				tags: ['base'],
				desc: 'вертикальной отдачи при стрельбе из ручного оружия',
				curLvl: 0,
				maxLvl: 4,
				costPerLvl: 3,
				progression: ['-10%', '-20%', '-30%', '-40%'],
			},
			chamberingSpeed: {
				icon: 'weapon/tier2/chambering-speed.svg',
				tags: ['base'],
				desc: 'скорость досылания патрона при стрельбе из винтовок с продольно-скользящим затвором',
				curLvl: 0,
				maxLvl: 3,
				costPerLvl: 4,
				progression: ['+4%', '+8%', '+12%'],
			},
			repairPower: {
				icon: 'weapon/tier2/repair-power.svg',
				tags: ['tank', 'apc-driver'],
				desc: 'восстановления прочности модулей после починки',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 5,
				progression: ['+10%', '+20%'],
			},
			knockoutBleeding: {
				icon: 'weapon/tier2/knockout-bleeding.svg',
				tags: ['base'],
				desc: 'время в состоянии тяжелого ранения перед смертью; Больший шанс выжить при получении смертельного урона',
				curLvl: 0,
				maxLvl: 5,
				costPerLvl: 2,
				progression: ['+10%', '+20%', '+30%', '+40%', '+50%'],
			},
			reloadingSpeed: {
				icon: 'weapon/tier2/reloading-speed.svg',
				tags: ['base'],
				desc: 'скорость перезарядки ручного оружия',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+6%', '+12%'],
			},
			mortarAmount: {
				icon: 'weapon/tier2/mortar-amount.svg',
				tags: ['mortar'],
				desc: 'боеприпасов миномёта',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 4,
				progression: ['+10%', '+20%'],
			},
			flameAmount: {
				icon: 'weapon/tier2/flame-amount.svg',
				tags: ['flamethrower'],
				desc: 'объём заправки огнемёта',
				curLvl: 0,
				maxLvl: 2,
				costPerLvl: 5,
				progression: ['+12.5%', '+25%'],
			},
		},
		tier3: {
			horizontalRecoil: {
				icon: 'weapon/tier3/horizontal-recoil.svg',
				tags: ['base'],
				desc: 'горизонтальной отдачи при стрельбе из ручного оружия',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['-30%'],
			},
			tankAccuracy: {
				icon: 'weapon/tier3/tank-accuracy.svg',
				tags: ['tank'],
				desc: 'Улучшенные навыки наведения танкового орудия (навык наводчика)',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['✓'],
			},
			tankReloadingSpeed: {
				icon: 'weapon/tier3/tank-reloading-speed.svg',
				tags: ['tank'],
				desc: 'скорость перезарядки танкового орудия (навык заряжающего)',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 16,
				progression: ['+20%'],
			},
			detectionRange: {
				icon: 'weapon/tier3/detection-range.svg',
				tags: ['pilot'],
				desc: 'дальность обнаружения самолётов противника',
				curLvl: 0,
				maxLvl: 1,
				costPerLvl: 15,
				progression: ['+50%'],
			},
		},
	},
];

export default skillsList;
