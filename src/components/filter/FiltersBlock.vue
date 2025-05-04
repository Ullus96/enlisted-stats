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

		<div class="filter__item">
			<span class="filter__label"> Класс: </span>
			<button
				class="filter__selected"
				@click.prevent="showFilterClasses"
				v-ripple
			>
				{{ selectedClasasName }}
				<IconBase
					class="filter__chevron"
					:class="{ rotate: isFilterClassesVisible }"
				>
					<IconAngleDown />
				</IconBase>
			</button>
		</div>

		<div class="filter__item" id="sortBy">
			<!-- <span>Сортировка:</span> -->
			<button class="filter__selected" @click.prevent="showSortBy" v-ripple>
				{{ sortByName }}
				<IconBase class="filter__chevron" :class="{ rotate: isSortByVisible }">
					<IconAngleDown />
				</IconBase>
			</button>
		</div>

		<div class="filter__item">
			<button
				class="filter__selected filter__sort-by-method"
				@click.prevent="changeOrder"
				v-ripple
			>
				<IconBase>
					<component :is="currentIcon" />
				</IconBase>
				<template v-if="sortBy == 'name'">
					{{ order === 'asc' ? 'А → Я' : 'Я → А' }}
				</template>
				<template v-if="sortBy == 'likes'">
					{{ order === 'asc' ? 'Сначала наименьшее' : 'Сначала наибольшее' }}
				</template>
				<template v-if="sortBy == 'date'">
					{{ order === 'asc' ? 'Сначала старые' : 'Сначала новые' }}
				</template>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import FilterClasses from './FilterClasses.vue';
import FilterSortBy from './FilterSortBy.vue';
import { SoldierID } from '@/type/Soldier';
import { getSoldierData } from '@/functions/convertSoldierDataToName';
import { IFilterParams, sortByValues } from './types';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconAngleDown from '@/components/ui/icon/icons/IconAngleDown.vue';
import IconSortDesc from '@/components/ui/icon/icons/IconSortDesc.vue';
import IconSortAsc from '@/components/ui/icon/icons/IconSortAsc.vue';

export default defineComponent({
	components: {
		FilterClasses,
		FilterSortBy,
		IconBase,
		IconAngleDown,
		IconSortDesc,
		IconSortAsc,
	},
	emits: ['filterParams'],
	props: {
		title: {
			required: false,
			type: String,
		},
		soldierClass: {
			required: false,
			type: [String, Boolean] as PropType<SoldierID | false>,
			default: false,
		},
		sortBy: {
			required: false,
			type: String as PropType<sortByValues>,
			default: 'createdAt',
		},
		order: {
			required: false,
			type: String as PropType<'asc' | 'desc'>,
			default: 'desc',
		},
	},
	setup(props, context) {
		const isFilterClassesVisible: Ref<boolean> = ref(false);
		const isSortByVisible: Ref<boolean> = ref(false);

		const soldierClass: Ref<SoldierID | false> = ref(
			props.soldierClass as SoldierID | false
		);
		const selectedClasasName: Ref<SoldierID | 'Акционные' | 'Все'> = ref('Все');

		const sortBy: Ref<sortByValues> = ref(props.sortBy);
		const sortByName: Ref<string> = ref('По дате создания');

		const order: Ref<'asc' | 'desc'> = ref(props.order);

		const currentIcon = computed(() =>
			order.value === 'desc' ? IconSortAsc : IconSortDesc
		);

		function showFilterClasses() {
			isFilterClassesVisible.value = !isFilterClassesVisible.value;
		}
		function showSortBy() {
			isSortByVisible.value = !isSortByVisible.value;
		}

		function setSoldierClass(newSoldierClass: SoldierID | false) {
			soldierClass.value = newSoldierClass;

			if (newSoldierClass === 'custom') {
				selectedClasasName.value = 'Акционные';
			} else if (!newSoldierClass) {
				selectedClasasName.value = 'Все';
			} else {
				selectedClasasName.value = getSoldierData(
					'id',
					newSoldierClass,
					'name'
				) as SoldierID;
			}
		}

		// sort
		const sortByNames: Record<sortByValues, string> = {
			name: 'По названию',
			likes: 'По лайкам',
			date: 'По дате создания',
		};

		function setSortBy(newSortBy: sortByValues) {
			sortBy.value = newSortBy;
			sortByName.value = sortByNames[newSortBy];
			console.log(newSortBy);
		}

		function changeOrder() {
			order.value === 'asc' ? (order.value = 'desc') : (order.value = 'asc');
		}

		// Emit data:
		const filterParams: Ref<IFilterParams> = ref({
			soldierClass: soldierClass.value,
			sortBy: sortBy.value,
			order: order.value,
		});

		watch(soldierClass, (newValue) => {
			filterParams.value.soldierClass = newValue;
			emitFilterParams();
		});

		watch(sortBy, (newValue: sortByValues) => {
			filterParams.value.sortBy = newValue;
			emitFilterParams();
		});

		watch(order, (newValue) => {
			filterParams.value.order = newValue;
			emitFilterParams();
		});

		// При инициализации обновляем данные
		setSoldierClass(soldierClass.value);
		setSortBy(sortBy.value);

		// Функция для эмита события с объектом параметров фильтрации
		function emitFilterParams() {
			context.emit('filterParams', filterParams.value);
		}

		return {
			soldierClass,
			selectedClasasName,
			isFilterClassesVisible,
			showFilterClasses,
			isSortByVisible,
			showSortBy,
			setSoldierClass,
			setSortBy,
			sortBy,
			order,
			currentIcon,
			sortByName,
			changeOrder,
		};
	},
});
</script>
