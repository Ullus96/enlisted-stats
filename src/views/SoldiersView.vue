<template>
	<div class="table-header container">
		<div
			class="table-header__col table-header__col--name table-header__search-bar"
			v-if="!isFilteredToClass"
		>
			<i class="fa-solid fa-magnifying-glass"></i>
			<input
				class="table-header__search-input"
				type="text"
				v-model.trim="search"
				id="searchInput"
			/>
		</div>
		<div class="table-header__col table-header__col--name" v-else>&nbsp;</div>
		<div class="table-header__col table-header__col--stat">★</div>
		<div class="table-header__col table-header__col--stat">★★</div>
		<div class="table-header__col table-header__col--stat">★★★</div>
		<div class="table-header__col table-header__col--stat">★★★★</div>
		<div class="table-header__col table-header__col--stat">★★★★★</div>
		<div class="table-header__col table-header__col--desc">Начальный перк</div>
	</div>

	<template v-if="!isFilteredToClass">
		<item-row
			v-for="(item, idx) in filteredItems"
			:key="item.id"
			:item="item"
			@click="handleClick(idx)"
		></item-row>
		<div class="item__break">&nbsp;</div>
	</template>

	<!-- render single selected soldier -->
	<template v-if="isFilteredToClass">
		<item-row
			:item="filteredItems[activeIdx]"
			@click="removeFilter()"
		></item-row>

		<!-- preset builds -->
		<template v-if="filteredItems[activeIdx] && isPresetBuildsSelected">
			<skill-build :skills="filteredItems[activeIdx].skills"></skill-build>
		</template>

		<!-- calculator -->
		<div
			class="calculator container"
			v-if="isFilteredToClass && isCalculatorSelected"
		>
			<calculator-block
				:stats="calculateStatsByLvl(filteredItems[activeIdx].statsMod, 5)"
				:tags="filteredItems[activeIdx].tags"
			></calculator-block>
		</div>
	</template>

	<div class="container">
		<div class="btn-filter--wrapper" v-if="isFilteredToClass">
			<button
				class="btn btn-filter"
				@click="filteredSoldierButtonHandler('presets')"
			>
				Пресеты
			</button>
			<button
				class="btn btn-filter"
				@click="filteredSoldierButtonHandler('calculator')"
			>
				Калькулятор
			</button>
			<button class="btn btn-filter" @click="removeFilter()">
				Выключить фильтрацию
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { IItem } from '@/type/Item';
import ItemRow from '@/components/ItemRow.vue';
import SkillBuild from '@/components/SkillBuild.vue';
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	onUpdated,
	ref,
} from 'vue';
import type { Ref } from 'vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import CalculatorBranch from '@/components/calculator/CalculatorTier.vue';
import CalculatorSkill from '@/components/calculator/CalculatorSkill.vue';
import { calculateStatsByLvl } from '@/functions/characterUtils';

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

		const isPresetBuildsSelected: Ref<boolean> = ref(true);
		const isCalculatorSelected: Ref<boolean> = ref(false);

		function filteredSoldierButtonHandler(option: 'presets' | 'calculator') {
			isPresetBuildsSelected.value = false;
			isCalculatorSelected.value = false;

			switch (option) {
				case 'presets':
					isPresetBuildsSelected.value = true;
					break;
				case 'calculator':
					isCalculatorSelected.value = true;
					break;

				default:
					break;
			}
		}

		// https://stackoverflow.com/a/76009015
		const setFocusToElement = async () => {
			nextTick(() => {
				const element = document.getElementById('searchInput');
				if (element) {
					element.focus();
				}
			});
		};

		onMounted(() => {
			setFocusToElement();
		});

		onUpdated(() => {
			setFocusToElement();
		});

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
				tags: ['base'],
				statsMod: [0, 0, 0],
				perk: '',
			},
			{
				name: 'Боец I',
				id: 'fighter1',
				tags: ['base'],
				statsMod: [1, 1, 1],
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
				tags: ['base'],
				statsMod: [2, 2, 2],
				perk: '+5.3% скорость спринта',
			},
			{
				name: 'Боец III',
				id: 'fighter3',
				tags: ['base'],
				statsMod: [3, 3, 3],
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
				tags: ['base', 'medic'],
				statsMod: [1, 2, 0],
				perk: '+3.5% скорость бега',
			},
			{
				name: 'Штурмовик I',
				id: 'assaulter1',
				tags: ['base'],
				statsMod: [2, 0, 1],
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
				tags: ['base'],
				statsMod: [3, 1, 2],
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
				tags: ['base'],
				statsMod: [4, 2, 3],
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
				tags: ['base'],
				statsMod: [5, 3, 4],
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
				tags: ['base', 'engineer'],
				statsMod: [1, 2, 0],
				perk: '+21% скорость при движении лежа или в приседе',
			},
			{
				name: 'Инженер II',
				id: 'engineer2',
				tags: ['base', 'engineer'],
				statsMod: [2, 4, 0],
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
				tags: ['base'],
				statsMod: [2, -2, 3],
				perk: '+14% максимальная высота прыжка',
			},
			{
				name: 'Снайпер II',
				id: 'sniper2',
				tags: ['base'],
				statsMod: [2, -2, 4],
				perk: '+35% времени задержки дыхания при прицеливании',
			},
			{
				name: 'Снайпер III',
				id: 'sniper3',
				tags: ['base'],
				statsMod: [2, -2, 6],
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
				tags: ['base'],
				statsMod: [-2, 2, 3],
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
				tags: ['base'],
				statsMod: [-2, 4, 4],
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
				tags: ['base'],
				statsMod: [0, 0, 3],
				perk: '+3.5% скорость бега',
			},
			{
				name: 'Пулемётчик II',
				id: 'mg2',
				tags: ['base'],
				statsMod: [0, 0, 6],
				perk: '+7% скорость прицеливания из оружия',
			},
			{
				name: 'Пулемётчик III',
				id: 'mg3',
				tags: ['base'],
				statsMod: [1, 2, 6],
				perk: '+100% восстановления здоровья аптечкой',
			},
			{
				name: 'Радист I',
				id: 'radio1',
				tags: ['base'],
				statsMod: [5, 0, -2],
				perk: '+17.5% скорость смены оружия',
			},
			{
				name: 'Радист II',
				id: 'radio2',
				tags: ['base'],
				statsMod: [6, 2, -2],
				perk: '+70% восстановления здоровья аптечкой',
			},
			{
				name: 'Миномётчик',
				id: 'mortar',
				tags: ['base', 'mortar'],
				statsMod: [-1, 2, 2],
				perk: '-17.5% эффект тряски головы, вызванный близкими взрывами',
			},
			{
				name: 'Огнемётчик I',
				id: 'flamethrower1',
				tags: ['base', 'flamethrower'],
				statsMod: [2, 5, -1],
				perk: '+28% стабильности прицела ручного оружия при получении повреждений',
			},
			{
				name: 'Огнемётчик II',
				id: 'flamethrower2',
				tags: ['base', 'flamethrower'],
				statsMod: [2, 7, 0],
				perk: '+12.3% живучести',
			},
			{
				name: 'Пилот-истр. I',
				id: 'pilot-fighter1',
				tags: ['pilot'],
				statsMod: [0, 2, 1],
				perk: '+5% скорость восстановления лётной выносливости',
			},
			{
				name: 'Пилот-истр. II',
				id: 'pilot-fighter2',
				tags: ['pilot'],
				statsMod: [1, 3, 2],
				perk: '+5% лётной выносливости',
			},
			{
				name: 'Пилот-истр. III',
				id: 'pilot-fighter3',
				tags: ['pilot'],
				statsMod: [1, 5, 3],
				perk: '-10% эффект потери контроля при наступлении блэкаута при перегрузках',
			},
			{
				name: 'Пилот-штурм. I',
				id: 'pilot-attacker1',
				tags: ['pilot'],
				statsMod: [0, 1, 2],
				perk: '-5% эффект потери контроля при наступлении блэкаута при перегрузках',
			},
			{
				name: 'Пилот-штурм. II',
				id: 'pilot-attacker2',
				tags: ['pilot'],
				statsMod: [1, 2, 3],
				perk: '+10% угол сфокусированного и периферийного зрения',
			},
			{
				name: 'Пилот-штурм. III',
				id: 'pilot-attacker3',
				tags: ['pilot'],
				statsMod: [1, 3, 5],
				perk: '+21% лётной выносливости',
			},
			{
				name: 'Танкист I',
				id: 'tank1',
				tags: ['crew', 'tank'],
				statsMod: [3, -2, 2],
				perk: '+10% скорость посадки, выхода и смены места в технике',
			},
			{
				name: 'Танкист II',
				id: 'tank2',
				tags: ['crew', 'tank'],
				statsMod: [5, -2, 3],
				perk: '+5% скорость починки техники',
			},
			{
				name: 'Танкист III',
				id: 'tank3',
				tags: ['crew', 'tank'],
				statsMod: [7, -2, 4],
				perk: '+45% скорость переключения передач (навык водителя)',
			},
			{
				name: 'Мотоциклист I',
				id: 'moto1',
				tags: ['recon-crew', 'motorcycle'],
				statsMod: [2, 0, 4],
				perk: '+7% скорость починки техники',
			},
			{
				name: 'Водитель БТР',
				id: 'apc-driver',
				tags: ['recon-crew', 'apc-driver'],
				statsMod: [4, 0, 2],
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
			isPresetBuildsSelected,
			isCalculatorSelected,
			filteredSoldierButtonHandler,
			calculateStatsByLvl,
		};
	},
});
</script>

<style></style>
