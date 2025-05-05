<template>
	<div class="mt-l">
		<div class="container-sm wip">
			<img
				:src="require(`@/assets/no_events/img-${randomImageIndex}.webp`)"
				alt="Work In Progress"
				class="wip__img"
			/>
			<div class="wip__text-block">
				<h2 class="wip__title">События закончились</h2>
				<p class="wip__desc">Отдохни, солдат.</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		let randomImageIndex = ref(1);

		onMounted(() => {
			randomImageIndex.value = Math.floor(Math.random() * 8 + 1);
		});

		return { randomImageIndex };
	},
});
</script>
