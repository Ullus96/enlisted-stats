<template>
	<section class="ccard__block">
		<div class="ccard__header">
			<h3 class="ccard__title">Сборки: Мои и избранные</h3>
			<div class="ccard__chips">
				<div class="chip ccard__chip active" v-ripple>Все</div>
				<div class="chip ccard__chip" v-ripple>Мои (3)</div>
				<div class="chip ccard__chip" v-ripple>Избранные (2)</div>
			</div>
		</div>

		<div class="ccard__build-cards">
			<CompactBuildCard v-for="item in 5" />
		</div>

		<p class="ccard__tutorial">
			<template v-if="true">
				♡ Создайте свою, или лайкните сборки других и они появятся здесь!
			</template>
			<template v-if="false">
				♡ Лайкните сборки других и они появятся здесь!
			</template>
		</p>

		<div class="ccard__load-more">
			<span class="ccard__load-more-desc">
				Есть еще
				<span class="ccard__load-more-number"
					>{{ Math.floor(Math.random() * 15 + 1) }} сборок</span
				>
			</span>
			<button class="btn btn-m btn-secondary">Показать еще</button>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CompactBuildCard from './CompactBuildCard.vue';

export default defineComponent({
	components: { CompactBuildCard },
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
