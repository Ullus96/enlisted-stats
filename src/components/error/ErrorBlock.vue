<template>
	<Teleport to="body">
		<div class="error">
			<error-entity
				v-for="(error, index) in errorArray"
				:key="error"
				:errorData="error"
				:index="index"
			></error-entity>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, nextTick, onUpdated, PropType, Ref, ref } from 'vue';
import ErrorEntity from './ErrorEntity.vue';
import { IErrorEntity } from '@/type/CustomErrors';

export default defineComponent({
	props: {
		// anError: {
		// 	required: false,
		// 	type: Object as PropType<IErrorEntity>,
		// },
		errorArray: {
			required: true,
			type: Object as PropType<IErrorEntity>,
		},
	},
	components: { ErrorEntity },
	setup(props) {
		// {
		// 	title: 'Недостаточно очков!',
		// 	desc: 'Навык стоит больше, чем у тебя имеется очков в распоряжении.',
		// },
		// const errorData: Ref<IErrorEntity[]> = ref([]);
		// onUpdated(() => {
		// 	clearErrors();
		// 	if (props.anError) {
		// 		createError(props.anError.title, props.anError.desc);
		// 	}
		// });
		// function clearErrors() {
		// 	// errorData.value.splice(0, 1);
		// 	errorData.value.splice(0, errorData.value.length);
		// }
		// function createError(title: string, desc: string) {
		// 	errorData.value.push({
		// 		title,
		// 		desc,
		// 	});
		// }
		// function closeError(index: number) {
		// 	console.log(`Caught closeError on parent with index ${index}`);
		// 	errorData.value.splice(index, 1);
		// }
		// return { errorData };
	},
});
</script>
