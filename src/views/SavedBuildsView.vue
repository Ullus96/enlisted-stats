<template>
	<builds-block :from="'liked'" :title="'Сохраненные сборки'"></builds-block>
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
