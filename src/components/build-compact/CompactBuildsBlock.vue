<template>
	<section class="ccard__block">
		<div class="ccard__header">
			<h3 class="ccard__title">Сборки: Мои и избранные</h3>
			<div class="ccard__chips">
				<div class="chip ccard__chip">Все</div>
				<div class="chip ccard__chip">Мои (3)</div>
				<div class="chip ccard__chip">Избранные (2)</div>
			</div>
		</div>

		<div class="ccard__build-cards">
			<CompactBuildCard />
			<CompactBuildCard />
			<CompactBuildCard />
		</div>

		<p class="ccard__tutorial">
			♡ Лайкните сборки других и они появятся здесь!
		</p>
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
