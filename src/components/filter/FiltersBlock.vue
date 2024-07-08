<template>
	<h3 class="filter__title mt-l">{{ title }}</h3>
	<div class="filter__block">
		<!-- popups -->
		<filter-classes
			v-if="isFilterClassesVisible"
			@close="showFilterClasses"
			@clickHandle="setSoldierClass"
		></filter-classes>
		<filter-sort-by
			v-if="isSortByVisible"
			@close="showSortBy"
			@setSortBy="setSortBy"
		>
		</filter-sort-by>
		<!-- end of popups -->

		<!-- temporary hide classes -->
		<template v-if="true">
			<div class="filter__item">
				<span class="filter__label"> Класс: </span>
				<button class="filter__selected" @click.prevent="showFilterClasses">
					{{ selectedClassName }}
					<span
						><i
							class="fa-solid fa-chevron-down filter__chevron"
							:class="{ rotate: isFilterClassesVisible }"
						></i
					></span>
				</button>
			</div>
		</template>

		<div class="filter__item" id="sortBy">
			<!-- <span>Сортировка:</span> -->
			<button class="filter__selected" @click.prevent="showSortBy">
				{{ sortByName }}
				<span
					><i
						class="fa-solid fa-chevron-down filter__chevron"
						:class="{ rotate: isSortByVisible }"
					></i
				></span>
			</button>
		</div>

		<div class="filter__item">
			<button
				class="filter__selected filter__sort-by-method"
				@click.prevent="changeSortByMethod"
			>
				<span
					><i
						class="fa-solid"
						:class="{
							'fa-arrow-down-wide-short': sortByMethod === 'desc',
							'fa-arrow-down-short-wide': sortByMethod === 'asc',
						}"
					></i
				></span>
				<template v-if="sortByID == 'nameLowercase'">
					{{ sortByMethod === 'asc' ? 'А → Я' : 'Я → А' }}
				</template>
				<template v-if="sortByID == 'likesAmount'">
					{{
						sortByMethod === 'asc' ? 'Сначала наименьшее' : 'Сначала наибольшее'
					}}
				</template>
				<template v-if="sortByID == 'createdAt'">
					{{ sortByMethod === 'asc' ? 'Сначала старые' : 'Сначала новые' }}
				</template>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from 'vue';
import FilterClasses from './FilterClasses.vue';
import FilterSortBy from './FilterSortBy.vue';
import { SoldierID } from '@/type/Soldier';
import { getSoldierData } from '@/functions/convertSoldierDataToName';
import { IFilterParams } from './types';

export default defineComponent({
	components: { FilterClasses, FilterSortBy },
	emits: ['filterParams'],
	props: {
		title: {
			required: false,
			type: String,
		},
		selectedClass: {
			required: false,
			default: false,
		},
	},
	setup(props, context) {
		const isFilterClassesVisible: Ref<boolean> = ref(false);
		const isSortByVisible: Ref<boolean> = ref(false);
		const selectedClass: Ref<SoldierID | false> = ref(false);
		const selectedClassName: Ref<SoldierID | 'Акционные' | 'Все'> = ref('Все');
		const sortByID: Ref<string> = ref('createdAt');
		const sortByMethod: Ref<'asc' | 'desc'> = ref('desc');
		const sortByName: Ref<string> = ref('По дате создания');

		function showFilterClasses() {
			isFilterClassesVisible.value = !isFilterClassesVisible.value;
		}
		function showSortBy() {
			isSortByVisible.value = !isSortByVisible.value;
		}

		function setSoldierClass(soldierClass: SoldierID) {
			selectedClass.value = soldierClass;

			if (soldierClass === 'custom') {
				selectedClassName.value = 'Акционные';
			} else if (!soldierClass) {
				selectedClassName.value = 'Все';
			} else {
				selectedClassName.value = getSoldierData(
					'id',
					soldierClass,
					'name'
				) as SoldierID;
			}
		}

		// sort
		const sortByNames: Record<string, string> = {
			nameLowercase: 'По названию',
			likesAmount: 'По лайкам',
			createdAt: 'По дате создания',
		};
		function setSortBy(sortBy: string) {
			sortByID.value = sortBy;
			sortByName.value = sortByNames[sortBy];
		}

		function changeSortByMethod() {
			sortByMethod.value === 'asc'
				? (sortByMethod.value = 'desc')
				: (sortByMethod.value = 'asc');
		}

		// Emit data:
		const filterParams: Ref<IFilterParams> = ref({
			selectedClass: selectedClass.value,
			sortByID: sortByID.value,
			sortByMethod: sortByMethod.value,
		});

		watch(selectedClass, (newValue) => {
			filterParams.value.selectedClass = newValue;
			emitFilterParams();
		});

		watch(sortByID, (newValue) => {
			filterParams.value.sortByID = newValue;
			emitFilterParams();
		});

		watch(sortByMethod, (newValue) => {
			filterParams.value.sortByMethod = newValue;
			emitFilterParams();
		});

		// Функция для эмита события с объектом параметров фильтрации
		function emitFilterParams() {
			context.emit('filterParams', filterParams.value);
		}

		return {
			selectedClass,
			selectedClassName,
			isFilterClassesVisible,
			showFilterClasses,
			isSortByVisible,
			showSortBy,
			setSoldierClass,
			setSortBy,
			sortByID,
			sortByMethod,
			sortByName,
			changeSortByMethod,
		};
	},
});
</script>
