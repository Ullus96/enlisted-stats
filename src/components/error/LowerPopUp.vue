<template>
	<div
		class="lower-popup__item"
		:class="{ error: type == 'error', success: type == 'success' }"
	>
		<h2 class="lower-popup__title" v-if="title">
			{{ title }}
		</h2>
		<p class="lower-popup__desc">
			<slot></slot>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		type: {
			required: false,
			type: String as PropType<'error' | 'success'>,
			default: 'success',
		},
		title: {
			required: false,
		},
	},

	setup() {},
});
</script>
