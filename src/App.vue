<template>
	<header class="header container">
		<div
			class="header__col header__col--name header__search-bar"
			v-if="!isFilteredToClass && false"
		>
			<i class="fa-solid fa-magnifying-glass"></i>
			<input class="header__search-input" type="text" v-model.trim="search" />
		</div>
		<div class="header__col header__col--name" v-else>&nbsp;</div>
		<div class="header__col header__col--stat">★</div>
		<div class="header__col header__col--stat">★★</div>
		<div class="header__col header__col--stat">★★★</div>
		<div class="header__col header__col--stat">★★★★</div>
		<div class="header__col header__col--stat">★★★★★</div>
		<div class="header__col header__col--desc">Начальный перк</div>
	</header>
	<!-- temporary off everything -->
	<template v-if="false">
		<template v-if="!isFilteredToClass">
			<item-row
				v-for="(item, idx) in filteredItems"
				:key="item.id"
				:item="item"
				@click="handleClick(idx)"
			></item-row>
		</template>

		<template v-if="isFilteredToClass">
			<item-row
				:item="filteredItems[activeIdx]"
				@click="removeFilter()"
			></item-row>

			<template v-if="filteredItems[activeIdx]">
				<skill-build :skills="filteredItems[activeIdx].skills"></skill-build>
			</template>
		</template>

		<div class="container">
			<div class="btn-filter--wrapper" v-if="isFilteredToClass">
				<button class="btn btn-filter" @click="removeFilter()">
					Выключить фильтрацию
				</button>
			</div>
		</div>
	</template>
	<!-- calculator -->
	<div class="calculator container">
		<div class="calculator__header">
			<div class="calculator__stats">
				<h2 class="calculator__stats-unused-title">Неиспользованные навыки:</h2>
				<div class="calculator__stats-flex">
					<div class="calculator__stats-item mobility">16</div>
					<div class="calculator__stats-item vitality">12</div>
					<div class="calculator__stats-item weapon-handling">14</div>
				</div>
			</div>
			<div class="calculator__save-settings">
				<input type="text" id="calculator-name" placeholder="Имя сборки" />
				<label for="calculator-name">123</label>
				<input type="checkbox" id="visible-for-public" />
				<label for="visible-for-public">Сделать видимым для всех?</label>
			</div>
		</div>
		<calculator-block></calculator-block>
	</div>
</template>

<script lang="ts">
import { IItem } from './type/Item';
import ItemRow from './components/ItemRow.vue';
import SkillBuild from './components/SkillBuild.vue';
import { computed, defineComponent, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import CalculatorBlock from './components/calculator/CalculatorBlock.vue';
import CalculatorBranch from './components/calculator/CalculatorBranch.vue';
import CalculatorSkill from './components/calculator/CalculatorSkill.vue';

export default defineComponent({
	name: 'App',
	components: {
		ItemRow,
		SkillBuild,
		CalculatorBlock,
		CalculatorBranch,
		CalculatorSkill,
	},
	setup() {
		const isFilteredToClass: Ref<boolean> = ref(false);
		const activeIdx: Ref<number> = ref(0);

		function handleClick(idx: number) {
			isFilteredToClass.value = true;
			activeIdx.value = idx;
		}

		function removeFilter() {
			isFilteredToClass.value = false;
		}

		function getImgPath(link: string): string {
			if (typeof link === 'string') {
				return link;
			} else {
				throw new Error('No path found');
			}
		}

		function generateKey() {
			return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
		}

		const search: Ref<string> = ref('');

		const filteredItems = computed(() =>
			items.filter((item) =>
				item.name.toLowerCase().includes(search.value.toLowerCase())
			)
		);

		/*
					{
						key: generateKey(),
						title: 'Имя Сборки',
						link: 'fighter1.jpg',
					},
		*/

		const items: IItem[] = [
			{
				name: 'Стандартный',
				id: 'standart',
				lv1: [4, 4, 4],
				lv2: [6, 6, 6],
				lv3: [8, 8, 8],
				lv4: [10, 10, 10],
				lv5: [16, 16, 16],
				perk: '',
			},
			{
				name: 'Боец I',
				id: 'fighter1',
				lv1: [5, 5, 5],
				lv2: [7, 7, 7],
				lv3: [9, 9, 9],
				lv4: [11, 11, 11],
				lv5: [17, 17, 17],
				perk: '+10.5% скорости уменьшения разброса после резкого разворота',
				skills: [
					{
						key: generateKey(),
						title: 'Полуавтоматическая винтовка',
						link: 'fighter1-vertical.jpg',
					},
					{
						key: generateKey(),
						title: 'Гренадер',
						link: 'fighter1-grenadier.jpg',
					},
				],
			},
			{
				name: 'Боец II',
				id: 'fighter2',
				lv1: [6, 6, 6],
				lv2: [8, 8, 8],
				lv3: [10, 10, 10],
				lv4: [12, 12, 12],
				lv5: [18, 18, 18],
				perk: '+5.3% скорость спринта',
			},
			{
				name: 'Боец III',
				id: 'fighter3',
				lv1: [7, 7, 7],
				lv2: [9, 9, 9],
				lv3: [11, 11, 11],
				lv4: [13, 13, 13],
				lv5: [19, 19, 19],
				perk: '+15% скорость использования аптечки',
				skills: [
					{
						key: generateKey(),
						title: 'Полуавтоматическая винтовка',
						link: 'fighter3-1.jpg',
					},
					{
						key: generateKey(),
						title: 'Гренадер',
						link: 'fighter3-2.jpg',
					},
				],
			},
			{
				name: 'Медик',
				id: 'medic',
				lv1: [5, 6, 4],
				lv2: [7, 8, 6],
				lv3: [9, 10, 8],
				lv4: [11, 12, 10],
				lv5: [17, 18, 16],
				perk: '+3.5% скорость бега',
			},
			{
				name: 'Штурмовик I',
				id: 'assaulter1',
				lv1: [6, 4, 5],
				lv2: [8, 6, 7],
				lv3: [10, 8, 9],
				lv4: [12, 10, 11],
				lv5: [18, 16, 17],
				perk: '+35% скорость залезания на объекты',
				skills: [
					{
						key: generateKey(),
						title: 'До патча',
						link: 'assaulter1.jpg',
					},
				],
			},
			{
				name: 'Штурмовик II',
				id: 'assaulter2',
				lv1: [7, 5, 6],
				lv2: [9, 7, 8],
				lv3: [11, 9, 10],
				lv4: [13, 11, 12],
				lv5: [19, 17, 18],
				perk: '+35% выносливости',
				skills: [
					{
						key: generateKey(),
						title: 'Вертикальная',
						link: 'assaulter2-vertical.jpg',
					},
				],
			},
			{
				name: 'Штурмовик III',
				id: 'assaulter3',
				lv1: [8, 6, 7],
				lv2: [10, 8, 9],
				lv3: [12, 10, 11],
				lv4: [14, 12, 13],
				lv5: [20, 18, 19],
				perk: '+100% восстановления здоровья аптечкой',
				skills: [
					{
						key: generateKey(),
						title: 'Горизонтальная (без ударок)',
						link: 'assaulter3-horizontal-no-gren.jpg',
					},
					{
						key: generateKey(),
						title: 'Вертикальная (без ударок)',
						link: 'assaulter3-vertical-no-gren.jpg',
					},
				],
			},
			{
				name: 'Штурмовик IV',
				id: 'assaulter4',
				lv1: [9, 7, 8],
				lv2: [11, 9, 10],
				lv3: [13, 11, 12],
				lv4: [15, 13, 14],
				lv5: [21, 19, 20],
				perk: '+12% скорость перезарядки ручного оружия',
				skills: [
					{
						key: generateKey(),
						title: 'MP40',
						link: 'assaulter4.jpg',
					},
				],
			},
			{
				name: 'Инженер I',
				id: 'engineer1',
				lv1: [5, 6, 4],
				lv2: [7, 8, 6],
				lv3: [9, 10, 8],
				lv4: [11, 12, 10],
				lv5: [17, 18, 16],
				perk: '+21% скорость при движении лежа или в приседе',
			},
			{
				name: 'Инженер II',
				id: 'engineer2',
				lv1: [6, 8, 4],
				lv2: [8, 10, 6],
				lv3: [10, 12, 8],
				lv4: [12, 14, 10],
				lv5: [18, 20, 16],
				perk: '+35% скорость восстановления выносливости',
				skills: [
					{
						key: generateKey(),
						title: 'Терпеливый (медленная постройка)',
						link: 'eng2-slow.jpg',
					},
				],
			},
			{
				name: 'Снайпер I',
				id: 'sniper1',
				lv1: [6, 2, 7],
				lv2: [8, 4, 9],
				lv3: [10, 6, 11],
				lv4: [12, 8, 13],
				lv5: [18, 14, 19],
				perk: '+14% максимальная высота прыжка',
			},
			{
				name: 'Снайпер II',
				id: 'sniper2',
				lv1: [6, 2, 8],
				lv2: [8, 4, 10],
				lv3: [10, 6, 12],
				lv4: [12, 8, 14],
				lv5: [18, 14, 20],
				perk: '+35% времени задержки дыхания при прицеливании',
			},
			{
				name: 'Снайпер III',
				id: 'sniper3',
				lv1: [6, 2, 10],
				lv2: [8, 4, 12],
				lv3: [10, 6, 14],
				lv4: [12, 8, 16],
				lv5: [18, 14, 22],
				perk: '+4.8% скорость перезарядки ручного оружия',
				skills: [
					{
						key: generateKey(),
						title: 'Снайперский Mkb',
						link: 'sniper3.jpg',
					},
				],
			},
			{
				name: 'Бронебойщик I',
				id: 'at1',
				lv1: [2, 6, 7],
				lv2: [4, 8, 9],
				lv3: [6, 10, 11],
				lv4: [8, 12, 13],
				lv5: [14, 18, 19],
				perk: '+52.5% скорость изменения положения тела',
				skills: [
					{
						key: generateKey(),
						title: 'Стандартный',
						link: 'at1.jpg',
					},
				],
			},
			{
				name: 'Бронебойщик II',
				id: 'at2',
				lv1: [2, 8, 8],
				lv2: [4, 10, 10],
				lv3: [6, 12, 12],
				lv4: [8, 14, 14],
				lv5: [14, 20, 20],
				perk: '+17.5% дальности броска гранат',
				skills: [
					{
						key: generateKey(),
						title: 'Полуавтоматическая винтовка',
						link: 'at2-vertical.jpg',
					},
				],
			},
			{
				name: 'Пулемётчик I',
				id: 'mg1',
				lv1: [4, 4, 7],
				lv2: [6, 6, 9],
				lv3: [8, 8, 11],
				lv4: [10, 10, 13],
				lv5: [16, 16, 19],
				perk: '+3.5% скорость бега',
			},
			{
				name: 'Пулемётчик II',
				id: 'mg2',
				lv1: [4, 4, 10],
				lv2: [6, 6, 12],
				lv3: [8, 8, 14],
				lv4: [10, 10, 16],
				lv5: [16, 16, 22],
				perk: '+7% скорость прицеливания из оружия',
			},
			{
				name: 'Пулемётчик III',
				id: 'mg3',
				lv1: [5, 6, 10],
				lv2: [7, 8, 12],
				lv3: [9, 10, 14],
				lv4: [11, 12, 16],
				lv5: [17, 18, 22],
				perk: '+100% восстановления здоровья аптечкой',
			},
			{
				name: 'Радист I',
				id: 'radio1',
				lv1: [9, 4, 2],
				lv2: [11, 6, 4],
				lv3: [13, 8, 6],
				lv4: [15, 10, 8],
				lv5: [21, 16, 14],
				perk: '+17.5% скорость смены оружия',
			},
			{
				name: 'Радист II',
				id: 'radio2',
				lv1: [10, 6, 2],
				lv2: [12, 8, 4],
				lv3: [14, 10, 6],
				lv4: [16, 12, 8],
				lv5: [22, 18, 14],
				perk: '+70% восстановления здоровья аптечкой',
			},
			{
				name: 'Миномётчик',
				id: 'mortar',
				lv1: [3, 6, 6],
				lv2: [5, 8, 8],
				lv3: [7, 10, 10],
				lv4: [9, 12, 12],
				lv5: [15, 18, 18],
				perk: '-17.5% эффект тряски головы, вызванный близкими взрывами',
			},
			{
				name: 'Огнемётчик I',
				id: 'flame1',
				lv1: [6, 9, 3],
				lv2: [8, 11, 5],
				lv3: [10, 13, 7],
				lv4: [12, 15, 9],
				lv5: [18, 21, 15],
				perk: '+28% стабильности прицела ручного оружия при получении повреждений',
			},
			{
				name: 'Огнемётчик II',
				id: 'flame2',
				lv1: [6, 11, 4],
				lv2: [8, 13, 6],
				lv3: [10, 15, 8],
				lv4: [12, 17, 10],
				lv5: [18, 23, 16],
				perk: '+12.3% живучести',
			},
			{
				name: 'Пилот-истр. I',
				id: 'pilot-fighter1',
				lv1: [4, 6, 5],
				lv2: [6, 8, 7],
				lv3: [8, 10, 9],
				lv4: [10, 12, 11],
				lv5: [16, 18, 17],
				perk: '+5% скорость восстановления лётной выносливости',
			},
			{
				name: 'Пилот-истр. II',
				id: 'pilot-fighter2',
				lv1: [5, 7, 6],
				lv2: [7, 9, 8],
				lv3: [9, 11, 10],
				lv4: [11, 13, 12],
				lv5: [17, 19, 18],
				perk: '+5% лётной выносливости',
			},
			{
				name: 'Пилот-истр. III',
				id: 'pilot-fighter3',
				lv1: [5, 9, 7],
				lv2: [7, 11, 9],
				lv3: [9, 13, 11],
				lv4: [11, 15, 13],
				lv5: [17, 21, 19],
				perk: '-10% эффект потери контроля при наступлении блэкаута при перегрузках',
			},
			{
				name: 'Пилот-штурм. I',
				id: 'pilot-attacker1',
				lv1: [4, 5, 6],
				lv2: [6, 7, 8],
				lv3: [8, 9, 10],
				lv4: [10, 11, 12],
				lv5: [16, 17, 18],
				perk: '-5% эффект потери контроля при наступлении блэкаута при перегрузках',
			},
			{
				name: 'Пилот-штурм. II',
				id: 'pilot-attacker2',
				lv1: [5, 6, 7],
				lv2: [7, 8, 9],
				lv3: [9, 10, 11],
				lv4: [11, 12, 13],
				lv5: [17, 18, 19],
				perk: '+10% угол сфокусированного и периферийного зрения',
			},
			{
				name: 'Пилот-штурм. III',
				id: 'pilot-attacker3',
				lv1: [5, 7, 9],
				lv2: [7, 9, 11],
				lv3: [9, 11, 13],
				lv4: [11, 13, 15],
				lv5: [17, 19, 21],
				perk: '+21% лётной выносливости',
			},
			{
				name: 'Танкист I',
				id: 'tank1',
				lv1: [7, 2, 6],
				lv2: [9, 4, 8],
				lv3: [11, 6, 10],
				lv4: [13, 8, 12],
				lv5: [19, 14, 18],
				perk: '+10% скорость посадки, выхода и смены места в технике',
			},
			{
				name: 'Танкист II',
				id: 'tank2',
				lv1: [9, 2, 7],
				lv2: [11, 4, 9],
				lv3: [13, 6, 11],
				lv4: [15, 8, 13],
				lv5: [21, 14, 19],
				perk: '+5% скорость починки техники',
			},
			{
				name: 'Танкист III',
				id: 'tank3',
				lv1: [11, 2, 8],
				lv2: [13, 4, 10],
				lv3: [15, 6, 12],
				lv4: [17, 8, 14],
				lv5: [23, 14, 20],
				perk: '+45% скорость переключения передач (навык водителя)',
			},
			{
				name: 'Мотоциклист I',
				id: 'moto1',
				lv1: [6, 4, 8],
				lv2: [8, 6, 10],
				lv3: [10, 8, 12],
				lv4: [12, 10, 14],
				lv5: [18, 16, 20],
				perk: '+7% скорость починки техники',
			},
			{
				name: 'Водитель БТР',
				id: 'driver-btr',
				lv1: [8, 4, 6],
				lv2: [10, 6, 8],
				lv3: [12, 8, 10],
				lv4: [14, 10, 12],
				lv5: [20, 16, 18],
				perk: '+35% скорость переключения передач (навык водителя)',
			},
		];

		return {
			items,
			handleClick,
			isFilteredToClass,
			activeIdx,
			removeFilter,
			getImgPath,
			search,
			filteredItems,
		};
	},
});
</script>

<style></style>
