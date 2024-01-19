<template>
	<div class="cc container">
		<template v-if="isEditingSettings">
			<div class="cc__stats-block">
				<h2 class="cc__stats-title">Распределить характеристики солдата</h2>
				<div class="cc__stats-flexbox">
					<div class="cc__stat-item">
						<input type="number" class="cc__stat-amount" v-model="stats[0]" />
						<p class="cc__stat-name mobility-bg">Мобильность</p>
					</div>
					<div class="cc__stat-item">
						<input type="number" class="cc__stat-amount" v-model="stats[1]" />
						<p class="cc__stat-name vitality-bg">Живучесть</p>
					</div>
					<div class="cc__stat-item">
						<input type="number" class="cc__stat-amount" v-model="stats[2]" />
						<p class="cc__stat-name weapon-handling-bg">Оружие</p>
					</div>
				</div>
			</div>

			<div class="cc__stats-block">
				<div class="cc__tags-title">
					<h2>Выбрать специализации солдата</h2>
					<i class="fa-regular fa-circle-question cc__tags-tooltip-icon"></i>
					<div class="cc__tags-tooltip">
						<p>
							Выбери специализации для солдата, чтобы определить доступные ему
							навыки.
						</p>
						<p>
							Например, солдат со специализациями <b>пехотинец</b> и
							<b>инженер</b> будет обладать навыками стрельбы (отдача и пр.) и
							строительства.
						</p>
						<p>
							В то время как солдат со специализациями <b>член экипажа</b> и
							<b>танкист</b> будет обладать навыками танкиста.
						</p>
					</div>
				</div>

				<div class="cc__stats-flexbox">
					<c-c-tag-item
						v-for="(item, tag) in avaliableTags"
						:key="item"
						:item="item"
						:tag="tag"
						:activeTags="tags"
						@tagClicked="tagClicked"
					></c-c-tag-item>
				</div>
			</div>

			<button
				class="btn btn-main cc__btn"
				@click.prevent="isEditingSettings = !isEditingSettings"
			>
				Продолжить <i class="fa-solid fa-arrow-right"></i>
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
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue';
import { avaliableTags } from '@/data/customCalculatorTags';
import CCTagItem from '@/components/cc/CCTagItem.vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: { CCTagItem, CalculatorBlock },
	setup() {
		const stats = reactive([16, 16, 16]);
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

			// After handling tags, update the route
			const router = useRouter();

			if (!isEditingSettings.value) {
				// If not editing settings, navigate to /calculator/edit
				router.push({ path: '/calculator/edit' });
			}
		}

		return { avaliableTags, stats, tags, tagClicked, isEditingSettings };
	},
});
</script>
