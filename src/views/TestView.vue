<template>
	<div class="container mt-l">
		<div
			class="flex"
			style="
				display: flex;
				flex-direction: column;
				gap: 20px;
				width: fit-content;
				margin: 0 auto;
				padding: 1.2rem;
			"
		>
			<button class="btn btn-m btn-secondary">Create an empty popup</button>
			<button class="btn btn-m btn-secondary" @click="createPopUp(dangerPopUp)">
				Create a danger popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUp(warningPopUp)"
			>
				Create a warning popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUp(successPopUp)"
			>
				Create a success popup
			</button>
			<button class="btn btn-m btn-secondary" @click="deletePopUp">
				Delete a popup
			</button>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
			<p>-</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { PopUp } from '@/store/index';

export default defineComponent({
	setup() {
		const store = useStore();

		const dangerPopUp: PopUp = {
			type: 'danger',
			title: 'Ахтунг!',
			desc: 'Все пошло не так!!!',
		};

		const warningPopUp: PopUp = {
			type: 'warning',
			title: 'Нарушение стабильности кристалла Суперматерии',
			desc: 'Целостность кристалла 80%. Инженерному отделу необходимо вмешаться и стабилиризовать плазма-реакцию!',
		};

		const successPopUp: PopUp = {
			type: 'success',
			title: 'Все хорошо',
			desc: '',
		};

		function createPopUp(data: PopUp) {
			store.commit('deletePopUp');
			store.commit('createPopUp', data);
		}

		function deletePopUp() {
			store.commit('deletePopUp');
		}

		return {
			createPopUp,
			deletePopUp,
			dangerPopUp,
			warningPopUp,
			successPopUp,
		};
	},
});
</script>
