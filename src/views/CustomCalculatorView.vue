<template>
	<div class="cc container">
		<div class="cc__stats-block">
			<h2 class="cc__stats-title">Определи характеристики солдата</h2>
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
			<h2 class="cc__stats-title">Определи специализации солдата</h2>
			<div class="cc__stats-flexbox">
				<c-c-tag-item
					v-for="(item, tag) in avaliableTags"
					:key="item"
					:item="item"
					:tag="tag"
				></c-c-tag-item>

				<!-- <div
					class="cc__tag-item"
					:class="{ active: isCheckboxChecked }"
					v-for="item in avaliableTags"
					:key="item"
				>
					<input
						type="checkbox"
						:name="123"
						:id="123"
						v-model="isCheckboxChecked"
						class="cc__tag-checkbox"
					/>
					<label for="123" class="cc__tag-label">&nbsp;</label>
					<i
						class="fa-solid fa-plus cc__tag-add-btn"
						:class="{ active: isCheckboxChecked }"
					></i>
					<p class="cc__tag-name">{{ item.name }}</p>
					<div class="cc__tag-tooltip">
						<p class="cc__tag-tooltip--description">
							{{ item.desc }}
						</p>
						<p class="cc__tag-tooltip--title">Кто использует:</p>
						<p class="cc__tag-tooltip-classes-flex">
							<img
								v-for="user in item.users"
								:key="user"
								:src="require('@/assets/soldier_icons/' + user + '.svg')"
							/>
						</p>
					</div>
				</div> -->
			</div>
		</div>

		<p class="cc__disclaimer">
			Это - кастомный калькулятор. Если нет необходимости раскидывать навыки для
			премиумных отрядов - воспользуйтесь кнопкой "Калькулятор", выбрав бойца
			нужной специализации в таблице
			<router-link to="/">"Бойцы"</router-link>.
		</p>
		<p>{{ stats }}</p>
		<p>{{ tags }}</p>
		<button class="btn btn-main cc__btn">
			Продолжить <i class="fa-solid fa-arrow-right"></i>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue';
import { avaliableTags } from '@/data/customCalculatorTags';
import CCTagItem from '@/components/cc/CCTagItem.vue';

export default defineComponent({
	components: { CCTagItem },
	setup() {
		const stats = reactive([16, 16, 16]);
		const tags = reactive(['base']);

		return { avaliableTags, stats, tags };
	},
});
</script>
