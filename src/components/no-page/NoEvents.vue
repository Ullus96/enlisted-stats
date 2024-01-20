<template>
	<div class="wip__block">
		<img
			:src="require(`@/assets/no_events/img-${randomImageIndex}.jpg`)"
			alt="Work In Progress"
			class="wip__img"
		/>
		<h2>События закончились</h2>
		<p>Отдохни, солдат.</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		let randomImageIndex = ref(1);

		onMounted(() => {
			randomImageIndex.value = Math.floor(Math.random() * 4 + 1);
		});

		return { randomImageIndex };
	},
});
</script>
