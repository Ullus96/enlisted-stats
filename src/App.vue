<template>
	<div class="page-wrapper">
		<the-header></the-header>
		<main class="main">
			<router-view></router-view>
		</main>
		<the-footer></the-footer>
	</div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import ItemRow from './components/ItemRow.vue';
import SkillBuild from './components/SkillBuild.vue';
import { defineComponent } from 'vue';
import CalculatorBlock from './components/calculator/CalculatorBlock.vue';
import CalculatorBranch from './components/calculator/CalculatorTier.vue';
import CalculatorSkill from './components/calculator/CalculatorSkill.vue';
import EventsView from './views/EventsView.vue';

export default defineComponent({
	name: 'App',
	components: {
		TheHeader,
		TheFooter,
		ItemRow,
		SkillBuild,
		CalculatorBlock,
		CalculatorBranch,
		CalculatorSkill,
		EventsView,
	},
	setup() {
		// const isFilteredToClass: Ref<boolean> = ref(false);
		// const activeIdx: Ref<number> = ref(0);
		// function handleClick(idx: number) {
		// 	isFilteredToClass.value = true;
		// 	activeIdx.value = idx;
		// }
		// function removeFilter() {
		// 	isFilteredToClass.value = false;
		// }
		// function getImgPath(link: string): string {
		// 	if (typeof link === 'string') {
		// 		return link;
		// 	} else {
		// 		throw new Error('No path found');
		// 	}
		// }
		// function generateKey() {
		// 	return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
		// }
		// const search: Ref<string> = ref('');
		// const filteredItems = computed(() =>
		// 	items.filter((item) =>
		// 		item.name.toLowerCase().includes(search.value.toLowerCase())
		// 	)
		// );
		// const isPresetBuildsSelected: Ref<boolean> = ref(true);
		// const isCalculatorSelected: Ref<boolean> = ref(false);
		// function filteredSoldierButtonHandler(option: 'presets' | 'calculator') {
		// 	isPresetBuildsSelected.value = false;
		// 	isCalculatorSelected.value = false;
		// 	switch (option) {
		// 		case 'presets':
		// 			isPresetBuildsSelected.value = true;
		// 			break;
		// 		case 'calculator':
		// 			isCalculatorSelected.value = true;
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// }
		// /*
		// 			{
		// 				key: generateKey(),
		// 				title: 'Имя Сборки',
		// 				link: 'fighter1.jpg',
		// 			},
		// */
		// const items: IItem[] = [
		// 	{
		// 		name: 'Стандартный',
		// 		id: 'standart',
		// 		tags: ['base'],
		// 		lv1: [4, 4, 4],
		// 		lv2: [6, 6, 6],
		// 		lv3: [8, 8, 8],
		// 		lv4: [10, 10, 10],
		// 		lv5: [16, 16, 16],
		// 		perk: '',
		// 	},
		// 	{
		// 		name: 'Боец I',
		// 		id: 'fighter1',
		// 		tags: ['base'],
		// 		lv1: [5, 5, 5],
		// 		lv2: [7, 7, 7],
		// 		lv3: [9, 9, 9],
		// 		lv4: [11, 11, 11],
		// 		lv5: [17, 17, 17],
		// 		perk: '+10.5% скорости уменьшения разброса после резкого разворота',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Полуавтоматическая винтовка',
		// 				link: 'fighter1-vertical.jpg',
		// 			},
		// 			{
		// 				key: generateKey(),
		// 				title: 'Гренадер',
		// 				link: 'fighter1-grenadier.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Боец II',
		// 		id: 'fighter2',
		// 		tags: ['base'],
		// 		lv1: [6, 6, 6],
		// 		lv2: [8, 8, 8],
		// 		lv3: [10, 10, 10],
		// 		lv4: [12, 12, 12],
		// 		lv5: [18, 18, 18],
		// 		perk: '+5.3% скорость спринта',
		// 	},
		// 	{
		// 		name: 'Боец III',
		// 		id: 'fighter3',
		// 		tags: ['base'],
		// 		lv1: [7, 7, 7],
		// 		lv2: [9, 9, 9],
		// 		lv3: [11, 11, 11],
		// 		lv4: [13, 13, 13],
		// 		lv5: [19, 19, 19],
		// 		perk: '+15% скорость использования аптечки',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Полуавтоматическая винтовка',
		// 				link: 'fighter3-1.jpg',
		// 			},
		// 			{
		// 				key: generateKey(),
		// 				title: 'Гренадер',
		// 				link: 'fighter3-2.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Медик',
		// 		id: 'medic',
		// 		tags: ['base', 'medic'],
		// 		lv1: [5, 6, 4],
		// 		lv2: [7, 8, 6],
		// 		lv3: [9, 10, 8],
		// 		lv4: [11, 12, 10],
		// 		lv5: [17, 18, 16],
		// 		perk: '+3.5% скорость бега',
		// 	},
		// 	{
		// 		name: 'Штурмовик I',
		// 		id: 'assaulter1',
		// 		tags: ['base'],
		// 		lv1: [6, 4, 5],
		// 		lv2: [8, 6, 7],
		// 		lv3: [10, 8, 9],
		// 		lv4: [12, 10, 11],
		// 		lv5: [18, 16, 17],
		// 		perk: '+35% скорость залезания на объекты',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'До патча',
		// 				link: 'assaulter1.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Штурмовик II',
		// 		id: 'assaulter2',
		// 		tags: ['base'],
		// 		lv1: [7, 5, 6],
		// 		lv2: [9, 7, 8],
		// 		lv3: [11, 9, 10],
		// 		lv4: [13, 11, 12],
		// 		lv5: [19, 17, 18],
		// 		perk: '+35% выносливости',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Вертикальная',
		// 				link: 'assaulter2-vertical.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Штурмовик III',
		// 		id: 'assaulter3',
		// 		tags: ['base'],
		// 		lv1: [8, 6, 7],
		// 		lv2: [10, 8, 9],
		// 		lv3: [12, 10, 11],
		// 		lv4: [14, 12, 13],
		// 		lv5: [20, 18, 19],
		// 		perk: '+100% восстановления здоровья аптечкой',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Горизонтальная (без ударок)',
		// 				link: 'assaulter3-horizontal-no-gren.jpg',
		// 			},
		// 			{
		// 				key: generateKey(),
		// 				title: 'Вертикальная (без ударок)',
		// 				link: 'assaulter3-vertical-no-gren.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Штурмовик IV',
		// 		id: 'assaulter4',
		// 		tags: ['base'],
		// 		lv1: [9, 7, 8],
		// 		lv2: [11, 9, 10],
		// 		lv3: [13, 11, 12],
		// 		lv4: [15, 13, 14],
		// 		lv5: [21, 19, 20],
		// 		perk: '+12% скорость перезарядки ручного оружия',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'MP40',
		// 				link: 'assaulter4.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Инженер I',
		// 		id: 'engineer1',
		// 		tags: ['base', 'engineer'],
		// 		lv1: [5, 6, 4],
		// 		lv2: [7, 8, 6],
		// 		lv3: [9, 10, 8],
		// 		lv4: [11, 12, 10],
		// 		lv5: [17, 18, 16],
		// 		perk: '+21% скорость при движении лежа или в приседе',
		// 	},
		// 	{
		// 		name: 'Инженер II',
		// 		id: 'engineer2',
		// 		tags: ['base', 'engineer'],
		// 		lv1: [6, 8, 4],
		// 		lv2: [8, 10, 6],
		// 		lv3: [10, 12, 8],
		// 		lv4: [12, 14, 10],
		// 		lv5: [18, 20, 16],
		// 		perk: '+35% скорость восстановления выносливости',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Терпеливый (медленная постройка)',
		// 				link: 'eng2-slow.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Снайпер I',
		// 		id: 'sniper1',
		// 		tags: ['base'],
		// 		lv1: [6, 2, 7],
		// 		lv2: [8, 4, 9],
		// 		lv3: [10, 6, 11],
		// 		lv4: [12, 8, 13],
		// 		lv5: [18, 14, 19],
		// 		perk: '+14% максимальная высота прыжка',
		// 	},
		// 	{
		// 		name: 'Снайпер II',
		// 		id: 'sniper2',
		// 		tags: ['base'],
		// 		lv1: [6, 2, 8],
		// 		lv2: [8, 4, 10],
		// 		lv3: [10, 6, 12],
		// 		lv4: [12, 8, 14],
		// 		lv5: [18, 14, 20],
		// 		perk: '+35% времени задержки дыхания при прицеливании',
		// 	},
		// 	{
		// 		name: 'Снайпер III',
		// 		id: 'sniper3',
		// 		tags: ['base'],
		// 		lv1: [6, 2, 10],
		// 		lv2: [8, 4, 12],
		// 		lv3: [10, 6, 14],
		// 		lv4: [12, 8, 16],
		// 		lv5: [18, 14, 22],
		// 		perk: '+4.8% скорость перезарядки ручного оружия',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Снайперский Mkb',
		// 				link: 'sniper3.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Бронебойщик I',
		// 		id: 'at1',
		// 		tags: ['base'],
		// 		lv1: [2, 6, 7],
		// 		lv2: [4, 8, 9],
		// 		lv3: [6, 10, 11],
		// 		lv4: [8, 12, 13],
		// 		lv5: [14, 18, 19],
		// 		perk: '+52.5% скорость изменения положения тела',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Стандартный',
		// 				link: 'at1.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Бронебойщик II',
		// 		id: 'at2',
		// 		tags: ['base'],
		// 		lv1: [2, 8, 8],
		// 		lv2: [4, 10, 10],
		// 		lv3: [6, 12, 12],
		// 		lv4: [8, 14, 14],
		// 		lv5: [14, 20, 20],
		// 		perk: '+17.5% дальности броска гранат',
		// 		skills: [
		// 			{
		// 				key: generateKey(),
		// 				title: 'Полуавтоматическая винтовка',
		// 				link: 'at2-vertical.jpg',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'Пулемётчик I',
		// 		id: 'mg1',
		// 		tags: ['base'],
		// 		lv1: [4, 4, 7],
		// 		lv2: [6, 6, 9],
		// 		lv3: [8, 8, 11],
		// 		lv4: [10, 10, 13],
		// 		lv5: [16, 16, 19],
		// 		perk: '+3.5% скорость бега',
		// 	},
		// 	{
		// 		name: 'Пулемётчик II',
		// 		id: 'mg2',
		// 		tags: ['base'],
		// 		lv1: [4, 4, 10],
		// 		lv2: [6, 6, 12],
		// 		lv3: [8, 8, 14],
		// 		lv4: [10, 10, 16],
		// 		lv5: [16, 16, 22],
		// 		perk: '+7% скорость прицеливания из оружия',
		// 	},
		// 	{
		// 		name: 'Пулемётчик III',
		// 		id: 'mg3',
		// 		tags: ['base'],
		// 		lv1: [5, 6, 10],
		// 		lv2: [7, 8, 12],
		// 		lv3: [9, 10, 14],
		// 		lv4: [11, 12, 16],
		// 		lv5: [17, 18, 22],
		// 		perk: '+100% восстановления здоровья аптечкой',
		// 	},
		// 	{
		// 		name: 'Радист I',
		// 		id: 'radio1',
		// 		tags: ['base'],
		// 		lv1: [9, 4, 2],
		// 		lv2: [11, 6, 4],
		// 		lv3: [13, 8, 6],
		// 		lv4: [15, 10, 8],
		// 		lv5: [21, 16, 14],
		// 		perk: '+17.5% скорость смены оружия',
		// 	},
		// 	{
		// 		name: 'Радист II',
		// 		id: 'radio2',
		// 		tags: ['base'],
		// 		lv1: [10, 6, 2],
		// 		lv2: [12, 8, 4],
		// 		lv3: [14, 10, 6],
		// 		lv4: [16, 12, 8],
		// 		lv5: [22, 18, 14],
		// 		perk: '+70% восстановления здоровья аптечкой',
		// 	},
		// 	{
		// 		name: 'Миномётчик',
		// 		id: 'mortar',
		// 		tags: ['base', 'mortar'],
		// 		lv1: [3, 6, 6],
		// 		lv2: [5, 8, 8],
		// 		lv3: [7, 10, 10],
		// 		lv4: [9, 12, 12],
		// 		lv5: [15, 18, 18],
		// 		perk: '-17.5% эффект тряски головы, вызванный близкими взрывами',
		// 	},
		// 	{
		// 		name: 'Огнемётчик I',
		// 		id: 'flamethrower1',
		// 		tags: ['base', 'flamethrower'],
		// 		lv1: [6, 9, 3],
		// 		lv2: [8, 11, 5],
		// 		lv3: [10, 13, 7],
		// 		lv4: [12, 15, 9],
		// 		lv5: [18, 21, 15],
		// 		perk: '+28% стабильности прицела ручного оружия при получении повреждений',
		// 	},
		// 	{
		// 		name: 'Огнемётчик II',
		// 		id: 'flamethrower2',
		// 		tags: ['base', 'flamethrower'],
		// 		lv1: [6, 11, 4],
		// 		lv2: [8, 13, 6],
		// 		lv3: [10, 15, 8],
		// 		lv4: [12, 17, 10],
		// 		lv5: [18, 23, 16],
		// 		perk: '+12.3% живучести',
		// 	},
		// 	{
		// 		name: 'Пилот-истр. I',
		// 		id: 'pilot-fighter1',
		// 		tags: ['pilot'],
		// 		lv1: [4, 6, 5],
		// 		lv2: [6, 8, 7],
		// 		lv3: [8, 10, 9],
		// 		lv4: [10, 12, 11],
		// 		lv5: [16, 18, 17],
		// 		perk: '+5% скорость восстановления лётной выносливости',
		// 	},
		// 	{
		// 		name: 'Пилот-истр. II',
		// 		id: 'pilot-fighter2',
		// 		tags: ['pilot'],
		// 		lv1: [5, 7, 6],
		// 		lv2: [7, 9, 8],
		// 		lv3: [9, 11, 10],
		// 		lv4: [11, 13, 12],
		// 		lv5: [17, 19, 18],
		// 		perk: '+5% лётной выносливости',
		// 	},
		// 	{
		// 		name: 'Пилот-истр. III',
		// 		id: 'pilot-fighter3',
		// 		tags: ['pilot'],
		// 		lv1: [5, 9, 7],
		// 		lv2: [7, 11, 9],
		// 		lv3: [9, 13, 11],
		// 		lv4: [11, 15, 13],
		// 		lv5: [17, 21, 19],
		// 		perk: '-10% эффект потери контроля при наступлении блэкаута при перегрузках',
		// 	},
		// 	{
		// 		name: 'Пилот-штурм. I',
		// 		id: 'pilot-attacker1',
		// 		tags: ['pilot'],
		// 		lv1: [4, 5, 6],
		// 		lv2: [6, 7, 8],
		// 		lv3: [8, 9, 10],
		// 		lv4: [10, 11, 12],
		// 		lv5: [16, 17, 18],
		// 		perk: '-5% эффект потери контроля при наступлении блэкаута при перегрузках',
		// 	},
		// 	{
		// 		name: 'Пилот-штурм. II',
		// 		id: 'pilot-attacker2',
		// 		tags: ['pilot'],
		// 		lv1: [5, 6, 7],
		// 		lv2: [7, 8, 9],
		// 		lv3: [9, 10, 11],
		// 		lv4: [11, 12, 13],
		// 		lv5: [17, 18, 19],
		// 		perk: '+10% угол сфокусированного и периферийного зрения',
		// 	},
		// 	{
		// 		name: 'Пилот-штурм. III',
		// 		id: 'pilot-attacker3',
		// 		tags: ['pilot'],
		// 		lv1: [5, 7, 9],
		// 		lv2: [7, 9, 11],
		// 		lv3: [9, 11, 13],
		// 		lv4: [11, 13, 15],
		// 		lv5: [17, 19, 21],
		// 		perk: '+21% лётной выносливости',
		// 	},
		// 	{
		// 		name: 'Танкист I',
		// 		id: 'tank1',
		// 		tags: ['crew', 'tank'],
		// 		lv1: [7, 2, 6],
		// 		lv2: [9, 4, 8],
		// 		lv3: [11, 6, 10],
		// 		lv4: [13, 8, 12],
		// 		lv5: [19, 14, 18],
		// 		perk: '+10% скорость посадки, выхода и смены места в технике',
		// 	},
		// 	{
		// 		name: 'Танкист II',
		// 		id: 'tank2',
		// 		tags: ['crew', 'tank'],
		// 		lv1: [9, 2, 7],
		// 		lv2: [11, 4, 9],
		// 		lv3: [13, 6, 11],
		// 		lv4: [15, 8, 13],
		// 		lv5: [21, 14, 19],
		// 		perk: '+5% скорость починки техники',
		// 	},
		// 	{
		// 		name: 'Танкист III',
		// 		id: 'tank3',
		// 		tags: ['crew', 'tank'],
		// 		lv1: [11, 2, 8],
		// 		lv2: [13, 4, 10],
		// 		lv3: [15, 6, 12],
		// 		lv4: [17, 8, 14],
		// 		lv5: [23, 14, 20],
		// 		perk: '+45% скорость переключения передач (навык водителя)',
		// 	},
		// 	{
		// 		name: 'Мотоциклист I',
		// 		id: 'moto1',
		// 		tags: ['recon-crew', 'motorcycle'],
		// 		lv1: [6, 4, 8],
		// 		lv2: [8, 6, 10],
		// 		lv3: [10, 8, 12],
		// 		lv4: [12, 10, 14],
		// 		lv5: [18, 16, 20],
		// 		perk: '+7% скорость починки техники',
		// 	},
		// 	{
		// 		name: 'Водитель БТР',
		// 		id: 'apc-driver',
		// 		tags: ['recon-crew', 'apc-driver'],
		// 		lv1: [8, 4, 6],
		// 		lv2: [10, 6, 8],
		// 		lv3: [12, 8, 10],
		// 		lv4: [14, 10, 12],
		// 		lv5: [20, 16, 18],
		// 		perk: '+35% скорость переключения передач (навык водителя)',
		// 	},
		// ];
		// return {
		// 	items,
		// 	handleClick,
		// 	isFilteredToClass,
		// 	activeIdx,
		// 	removeFilter,
		// 	getImgPath,
		// 	search,
		// 	filteredItems,
		// 	isPresetBuildsSelected,
		// 	isCalculatorSelected,
		// 	filteredSoldierButtonHandler,
		// };
	},
});
</script>

<style></style>
