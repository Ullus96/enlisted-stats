<template>
	<div class="event__stamp" :class="`event__stamp--${text}`">
		<p class="event__text">{{ text.toUpperCase() }}</p>
		<div class="event__border event__border--outer"></div>
		<div class="event__border event__border--inner"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		text: {
			required: true,
			type: String as PropType<'pass' | 'fail'>,
			default: 'fail',
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
