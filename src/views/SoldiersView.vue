<template>
	<div class="container mt-m">
		<label for="searchInput" v-if="!isFilteredToClass">
			<div class="table__search">
				<div class="table__search-icon tooltip-anchor">
					<TooltipComponent :direction="'bottom'">
						<p><span class="hotkey">Esc</span> - сбросить ввод</p>
					</TooltipComponent>
					<IconBase :iconName="'Search'">
						<IconSearch />
					</IconBase>
				</div>
				<input
					type="text"
					class="table__input"
					v-model.trim="search"
					id="searchInput"
					@keydown.esc="search = ''"
					placeholder="Начни вводить название класса"
				/>
			</div>
		</label>

		<div class="table__wrapper mt-s">
			<div class="table__header table__row">
				<div
					class="table__header--col table__col table__col--first tooltip-anchor"
				>
					<TooltipComponent>
						<p>Нажми по строчке чтобы включить/выключить фильтрацию.</p>
					</TooltipComponent>
					<IconBase :iconName="'Tooltip'">
						<IconQuestionCircle />
					</IconBase>
				</div>
				<div class="table__header--col table__col table__col--star">★</div>
				<div class="table__header--col table__col table__col--star">★★</div>
				<div class="table__header--col table__col table__col--star">★★★</div>
				<div class="table__header--col table__col table__col--star">★★★★</div>
				<div class="table__header--col table__col table__col--star">★★★★★</div>
				<div class="table__header--col table__col table__col--perk">
					Начальный перк
				</div>
			</div>

			<!-- Table itself -->
			<template v-if="!isFilteredToClass">
				<div class="table__wrapper--body">
					<item-row
						v-for="(item, idx) in filteredItems"
						:key="item.id"
						:item="item"
						@click="handleClick(idx)"
					></item-row>
				</div>
			</template>

			<!-- render single selected soldier -->
			<template v-if="isFilteredToClass">
				<div class="table__wrapper--body">
					<item-row
						:item="filteredItems[activeIdx]"
						@click="removeFilter()"
					></item-row>
				</div>

				<div
					class="calculator container"
					v-if="isFilteredToClass && isCalculatorSelected"
				>
					<calculator-block
						:stats="calculateStatsByLvl(filteredItems[activeIdx].statsMod, 5)"
						:tags="filteredItems[activeIdx].tags"
						:soldierClass="filteredItems[activeIdx].id"
					></calculator-block>
				</div>

				<div class="btn-flexbox">
					<button
						class="btn btn-small"
						@click="filteredSoldierButtonHandler('presets')"
					>
						Пресеты
					</button>
					<button
						class="btn btn-small"
						@click="filteredSoldierButtonHandler('calculator')"
					>
						Калькулятор
					</button>
				</div>
			</template>
		</div>
	</div>
	<!-- <div class="table-header container">
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
				@keydown.esc="search = ''"
			/>
			<div class="table-header__search-tooltip">
				<p><span class="hotkey">Esc</span> сбросить строку поиска</p>
				<p class="table-header__search-tooltip--desc">
					(при активном поле ввода)
				</p>
			</div>
		</div>
		<div class="table-header__col table-header__col--name filtered" v-else>
			<i class="fa-regular fa-circle-question"></i>
			<p class="table-header__col--name-tooltip">
				Нажми по отфильтрованной строчке, чтобы выключить фильтрацию
			</p>
		</div>
		<div class="table-header__col table-header__col--stat">★</div>
		<div class="table-header__col table-header__col--stat">★★</div>
		<div class="table-header__col table-header__col--stat">★★★</div>
		<div class="table-header__col table-header__col--stat">★★★★</div>
		<div class="table-header__col table-header__col--stat">★★★★★</div>
		<div class="table-header__col table-header__col--desc">Начальный перк</div>
	</div> -->

	<!-- table itself -->
	<!-- <template v-if="!isFilteredToClass">
		<item-row
			v-for="(item, idx) in filteredItems"
			:key="item.id"
			:item="item"
			@click="handleClick(idx)"
		></item-row>
	</template> -->

	<!-- render single selected soldier -->
	<!-- <template v-if="isFilteredToClass">
		<item-row
			:item="filteredItems[activeIdx]"
			@click="removeFilter()"
		></item-row> -->

	<!-- preset builds -->
	<!-- <template v-if="filteredItems[activeIdx] && isPresetBuildsSelected">
			<skill-build :skills="filteredItems[activeIdx].skills"></skill-build>
		</template> -->

	<!-- calculator -->
	<!-- <div
			class="calculator container"
			v-if="isFilteredToClass && isCalculatorSelected"
		>
			<calculator-block
				:stats="calculateStatsByLvl(filteredItems[activeIdx].statsMod, 5)"
				:tags="filteredItems[activeIdx].tags"
				:soldierClass="filteredItems[activeIdx].id"
			></calculator-block>
		</div>
	</template>

	<div class="container mt-s" v-if="isFilteredToClass">
		<div class="btn-flexbox">
			<button
				class="btn btn-small"
				@click="filteredSoldierButtonHandler('presets')"
			>
				Пресеты
			</button>
			<button
				class="btn btn-small"
				@click="filteredSoldierButtonHandler('calculator')"
			>
				Калькулятор
			</button>
		</div>
	</div> -->
</template>

<script lang="ts">
import ItemRow from '@/components/ItemRow.vue';
import SkillBuild from '@/components/SkillBuild.vue';
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	onUnmounted,
	onUpdated,
	ref,
} from 'vue';
import type { Ref } from 'vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import CalculatorBranch from '@/components/calculator/CalculatorTier.vue';
import CalculatorSkill from '@/components/calculator/CalculatorSkill.vue';
import { calculateStatsByLvl } from '@/functions/characterUtils';
import { items } from '@/data/soldiersList';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconSearch from '@/components/ui/icons/IconSearch.vue';
import IconQuestionCircle from '@/components/ui/icons/IconQuestionCircle.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	name: 'App',
	components: {
		ItemRow,
		SkillBuild,
		CalculatorBlock,
		CalculatorBranch,
		CalculatorSkill,
		IconBase,
		IconSearch,
		IconQuestionCircle,
		TooltipComponent,
	},
	setup() {
		const isFilteredToClass: Ref<boolean> = ref(false);
		const activeIdx: Ref<number> = ref(0);
		const route = useRoute();
		const router = useRouter();

		function handleClick(idx: number) {
			isFilteredToClass.value = true;
			activeIdx.value = idx;
		}

		function removeFilter() {
			isFilteredToClass.value = false;
			router.push({ name: 'Home' });
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
