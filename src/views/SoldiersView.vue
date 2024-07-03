<template>
	<div class="container mt-m">
		<label for="searchInput">
			<div class="table__search">
				<div class="table__search-icon tooltip-anchor">
					<TooltipComponent :direction="'bottom'">
						<p><span class="hotkey">Esc</span> - сбросить ввод</p>
					</TooltipComponent>
					<IconBase>
						<IconSearch />
					</IconBase>
				</div>
				<input
					type="text"
					class="table__input"
					v-model.trim="search"
					id="searchInput"
					@keydown.esc="search = ''"
					:placeholder="
						!isFilteredToClass ? 'Начни вводить название класса' : ''
					"
					:disabled="isFilteredToClass"
				/>
			</div>
		</label>

		<div class="table__wrapper mt-s">
			<div class="table__header table__row">
				<div class="table__header--col table__col table__col--first">
					<div class="table__header-question-icon tooltip-anchor">
						<TooltipComponent :direction="'right'" :width="25">
							<p>Нажми по строчке чтобы включить/выключить фильтрацию.</p>
						</TooltipComponent>

						<IconBase>
							<IconQuestionCircle />
						</IconBase>
					</div>
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
				<transition-group name="fade" tag="div" class="table__wrapper--body">
					<item-row
						v-for="(item, idx) in filteredItems"
						:key="item.id"
						:item="item"
						@click="handleClick(idx)"
					></item-row>
				</transition-group>
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
					class="table__calculator"
					v-if="isFilteredToClass && isCalculatorSelected"
				>
					<calculator-block
						:stats="calculateStatsByLvl(filteredItems[activeIdx].statsMod, 5)"
						:tags="filteredItems[activeIdx].tags"
						:soldierClass="filteredItems[activeIdx].id"
					></calculator-block>
				</div>

				<div class="table__promo-block" v-else>
					<h2>Популярные сборки от сообщества</h2>
					<div class="table__promo-builds">
						<div class="table__build" v-for="item in 3" :key="item"> </div>
					</div>
					<div class="table__promo-buttons">
						<!-- TODO: сделать редирект на страницу сборок вместе 
						с параметром поиска в виде класса и сорт бай нью, сначала новые -->
						<router-link to="/test">
							<button class="btn btn-m btn-secondary">Посмотреть еще</button>
						</router-link>
						<span class="table__promo-or">ИЛИ</span>
						<button
							class="btn btn-m btn-primary"
							@click="filteredSoldierButtonHandler('calculator')"
						>
							Создать свою сборку
						</button>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import ItemRow from '@/components/ItemRow.vue';
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
import { useRoute, useRouter } from 'vue-router';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconSearch from '@/components/ui/icons/IconSearch.vue';
import IconQuestionCircle from '@/components/ui/icons/IconQuestionCircle.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	name: 'App',
	components: {
		ItemRow,
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

		const isCalculatorSelected: Ref<boolean> = ref(false);

		function filteredSoldierButtonHandler(option: 'presets' | 'calculator') {
			isCalculatorSelected.value = false;

			switch (option) {
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
			isCalculatorSelected,
			filteredSoldierButtonHandler,
			calculateStatsByLvl,
		};
	},
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.18s ease-in-out, transform 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
