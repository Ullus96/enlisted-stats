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
import { items } from '@/data/soldiersList';

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
