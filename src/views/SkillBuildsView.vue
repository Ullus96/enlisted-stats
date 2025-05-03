<template>
	<builds-block :from="'base'" :title="'Список сборок'">
		<h1 class="section-title">Топовые сборки бойцов Enlisted</h1>
	</builds-block>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BuildsBlock from '@/components/build/BuildsBlock.vue';

export default defineComponent({
	components: { BuildsBlock },
	setup() {
		return {};
	},
});
</script>
