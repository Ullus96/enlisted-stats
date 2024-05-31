<template>
	<builds-block :from="'my'" :title="'Мои сборки'"></builds-block>
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
