<template>
	<section class="ccard__block">
		<div class="ccard__header">
			<h3 class="ccard__title">Сборки: Мои и избранные</h3>
			<div class="ccard__chips">
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'all' }"
					v-ripple
					@click="setFilter('all')"
				>
					Все
				</div>
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'my' }"
					v-ripple
					@click="setFilter('my')"
				>
					Мои
					<template v-if="myBuildsAmount > 0">
						({{ myBuildsAmount }})
					</template>
				</div>
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'liked' }"
					v-ripple
					@click="setFilter('liked')"
				>
					Избранные
					<template v-if="likedBuildsAmount > 0">
						({{ likedBuildsAmount }})
					</template>
				</div>
			</div>
		</div>

		<div class="ccard__build-cards">
			<CompactBuildCard v-for="item in 5" />
		</div>

		<p class="ccard__tutorial" v-if="hasLikedAndOwnedBuilds">
			<template v-if="myBuildsAmount === 0">
				♡ Создайте свою, или лайкните сборки других и они появятся здесь!
			</template>
			<template v-else-if="likedBuildsAmount === 0">
				♡ Лайкните сборки других и они появятся здесь!
			</template>
		</p>

		<div class="ccard__load-more">
			<span class="ccard__load-more-desc">
				Есть еще
				<span class="ccard__load-more-number"
					>{{ buildsLeftUnloaded }}
					{{
						getDeclension(buildsLeftUnloaded, ['сборка', 'сборки', 'сборок'])
					}}</span
				>
			</span>
			<button class="btn btn-m btn-secondary">Показать еще</button>
		</div>
	</section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import CompactBuildCard from './CompactBuildCard.vue';

export default defineComponent({
	components: { CompactBuildCard },
	setup() {
		type Filter = 'all' | 'my' | 'liked';
		const chosenFilter: Ref<Filter> = ref('all');
		function setFilter(filter: Filter) {
			chosenFilter.value = filter;
		}

		const myBuildsAmount: Ref<number> = ref(2);
		const likedBuildsAmount: Ref<number> = ref(1);
		const hasLikedAndOwnedBuilds = computed(
			() => !!(myBuildsAmount.value + likedBuildsAmount.value)
		);

		const buildsLeftUnloaded: Ref<number> = ref(5);

		function getDeclension(number: number, titles: [string, string, string]) {
			const cases = [2, 0, 1, 1, 1, 2];
			return titles[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[number % 10 < 5 ? number % 10 : 5]
			];
		}

		return {
			chosenFilter,
			setFilter,
			myBuildsAmount,
			likedBuildsAmount,
			hasLikedAndOwnedBuilds,
			buildsLeftUnloaded,
			getDeclension,
		};
	},
});
</script>

<style scoped></style>
