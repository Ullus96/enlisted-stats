<template>
	<section class="container mt-l">
		<template v-if="isEditingSettings">
			<div class="cc__stats-block">
				<h2 class="cc__title">Задай характеристики</h2>
				<div class="cc__stats-flexbox">
					<div class="cc__stat-item">
						<input
							type="number"
							class="cc__stat-amount"
							v-model="stats[0]"
							id="ccFirstStat"
							placeholder="16"
						/>
						<p class="cc__stat-name mobility-bg-a">Мобильность</p>
					</div>
					<div class="cc__stat-item">
						<input
							type="number"
							class="cc__stat-amount"
							v-model="stats[1]"
							placeholder="16"
						/>
						<p class="cc__stat-name vitality-bg-a">Живучесть</p>
					</div>
					<div class="cc__stat-item">
						<input
							type="number"
							class="cc__stat-amount"
							v-model="stats[2]"
							placeholder="16"
						/>
						<p class="cc__stat-name weapon-bg-a">Оружие</p>
					</div>
				</div>
			</div>

			<div class="cc__main-block">
				<div class="cc__left-col cc__col">
					<h2 class="cc__title">Выбери прототип солдата</h2>
					<p class="cc__text-desc">
						Выбирая прототип, ты выбираешь предустановки тегов. Этот шаг не
						обязателен. Ты всегда можешь добавить теги, сделав из инженера -
						десантника-инженера, или наоборот, выборочно удалить ненужные.
					</p>

					<div class="cc__chips-flex cc__chips-flex--square">
						<div
							class="chip chip-square tooltip-anchor"
							v-for="(soldier, idx) in uniqueSoldiersList"
							:key="soldier.name"
							@click="setTags(idx)"
						>
							<TooltipComponent>
								{{ soldier.name }}
							</TooltipComponent>
							<img
								:src="require(`../assets/soldier_icons/${soldier.icon}`)"
								alt=""
							/>
						</div>
					</div>
				</div>

				<div class="cc__right-col cc__col">
					<h2 class="cc__title">Выбери теги способностей</h2>
					<p class="cc__text-desc">
						Выбирая теги, ты определяешь то, какими способностями будет обладать
						солдат. Например, солдат с тегами пехотинец и инженер будет иметь
						навыки стрельбы (отдача&nbsp;и&nbsp;пр.) и строительства. Теги член
						экипажа и танкист — навыками танкиста.
					</p>

					<div class="cc__chips-flex cc__chips-flex--wide">
						<CcTagItem
							v-for="(item, tag) in avaliableTags"
							:key="item"
							:item="item"
							:tag="tag"
							:activeTags="tags"
							@tagClicked="tagClicked"
						></CcTagItem>
					</div>
				</div>
			</div>

			<button
				class="btn btn-m btn-primary cc__btn"
				@click.prevent="isEditingSettings = !isEditingSettings"
				:disabled="isDisabled"
			>
				Продолжить
			</button>

			<p class="cc__disclaimer">
				Это - кастомный калькулятор. Если нет необходимости раскидывать навыки
				для премиумных или акционных отрядов - воспользуйтесь кнопкой
				"Калькулятор", выбрав бойца нужной специализации в таблице
				<router-link to="/">"Бойцы"</router-link>.
			</p>
		</template>

		<template v-else>
			<div class="mt-s mb-m">
				<button
					class="btn btn-small mb-s cc__btn-back"
					@click="isEditingSettings = !isEditingSettings"
				>
					<i class="fa-solid fa-arrow-left"></i> Вернуться
				</button>

				<calculator-block
					:stats="stats"
					:tags="tags"
					:soldierClass="'custom'"
				></calculator-block>
			</div>
		</template>
	</section>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	Ref,
} from 'vue';
import { avaliableTags } from '@/data/customCalculatorTags';
import { uniqueSoldiersList } from '@/data/soldiersList';
import CcTagItem from '@/components/cc/CcTagItem.vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: { CcTagItem, CalculatorBlock, TooltipComponent },
	setup() {
		const stats = reactive([null, null, null]);
		const tags = reactive(['base']);
		const isEditingSettings: Ref<boolean> = ref(true);

		function tagClicked(payload: { tag: string; operation: 'add' | 'remove' }) {
			const { tag, operation } = payload;

			// remove existing object
			if (tags.includes(tag) && operation === 'remove') {
				const newArray = tags.filter((el) => el != tag);
				tags.length = 0;
				tags.push(...newArray);
			}

			// add a new object if tags doesn't already have it
			if (!tags.includes(tag) && operation === 'add') {
				tags.push(tag);
			}
		}

		// https://stackoverflow.com/a/76009015
		const setFocusToElement = async () => {
			nextTick(() => {
				const element = document.getElementById('ccFirstStat');
				if (element) {
					element.focus();
				}
			});
		};

		onMounted(() => {
			setFocusToElement();
		});

		const isDisabled = computed(() => {
			let isNotFilled = false;
			stats.forEach((elem) => {
				if (!elem) {
					isNotFilled = true;
				}
			});

			return isNotFilled;
		});

		function setTags(idx: number) {
			tags.length = 0;
			tags.push(...uniqueSoldiersList[idx].tags);
		}

		return {
			avaliableTags,
			uniqueSoldiersList,
			stats,
			tags,
			tagClicked,
			isEditingSettings,
			isDisabled,
			setTags,
		};
	},
});
</script>
