<template>
	<div class="error">
		<button class="btn error__btn-close" @click="closeError(index)">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<h2 class="error__title">{{ errorData.title }}</h2>
		<p class="error__desc">
			{{ errorData.desc }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IErrorEntity } from '@/type/CustomErrors';

export default defineComponent({
	props: {
		errorData: {
			required: true,
			type: Object as PropType<IErrorEntity>,
		},
		index: { required: true, type: Number },
	},
	setup(props, context) {
		function closeError(index: number) {
			console.log(`Error with index ${index} is closed!`);
			context.emit('closeError', index);
		}

		return { closeError };
	},
});
</script>
