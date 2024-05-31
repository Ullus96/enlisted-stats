<template>
	<div
		class="tooltip-item"
		:style="{ width: width }"
		:class="{
			'tooltip-up': position === 'up',
			'tooltip-down': position === 'down',
		}"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		position: {
			required: false,
			default: 'up',
			type: String as PropType<'up' | 'down'>,
		},
		width: {
			required: false,
			default: '300%',
			type: String,
		},
	},
	setup() {},
});
</script>
