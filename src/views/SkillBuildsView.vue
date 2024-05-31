<template>
	<builds-block :from="'base'" :title="'Список сборок'"></builds-block>
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
