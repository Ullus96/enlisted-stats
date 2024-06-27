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
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(dangerPopUp)"
			>
				Create a danger popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(warningPopUp)"
			>
				Create a warning popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(successPopUp)"
			>
				Create a success popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(POPUP_DELETE_USER_SUCCESS)"
			>
				Delete user (success)
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(POPUP_DELETE_USER_ERROR)"
			>
				Delete user (error)
			</button>
			<button class="btn btn-m btn-secondary" @click="deletePopUpHandler">
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
import { createPopUp, deletePopUp } from '@/components/popup/utils';
import {
	POPUP_DELETE_USER_SUCCESS,
	POPUP_DELETE_USER_ERROR,
} from '@/components/popup/data';

export default defineComponent({
	setup() {
		const store = useStore();

		const dangerPopUp: PopUp = {
			type: 'danger',
			title: 'Ахтунг!',
			desc: 'Все пошло не так!!!',
			duration: 1,
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
			duration: 10,
		};

		function createPopUpHandler(data: PopUp) {
			createPopUp(store, data);
		}

		function deletePopUpHandler() {
			deletePopUp(store);
		}

		return {
			createPopUpHandler,
			deletePopUpHandler,
			dangerPopUp,
			warningPopUp,
			successPopUp,
			POPUP_DELETE_USER_SUCCESS,
			POPUP_DELETE_USER_ERROR,
		};
	},
});
</script>
