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
			<button class="btn btn-m btn-secondary" v-ripple>
				Create an empty popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(dangerPopUp)"
				v-ripple
			>
				Create a danger popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(warningPopUp)"
				v-ripple
			>
				Create a warning popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(successPopUp)"
				v-ripple
			>
				Create a success popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(POPUP_DELETE_USER_SUCCESS)"
				v-ripple
			>
				Delete user (success)
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="createPopUpHandler(POPUP_DELETE_USER_ERROR)"
				v-ripple
			>
				Delete user (error)
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="deletePopUpHandler"
				v-ripple
			>
				Delete a popup
			</button>
			<button
				class="btn btn-m btn-secondary"
				@click="$store.state.dialog.isSwitchingBuildVisibility = true"
				v-ripple
			>
				Dialog
			</button>

			<DialogComponent
				:dialogName="'isSwitchingBuildVisibility'"
				v-if="$store.state.dialog.isSwitchingBuildVisibility"
				:yes="{ text: 'Переключить', type: 'primary' }"
				:no="{ text: 'Отмена', type: 'tertiary' }"
			>
				<template #title>Переключить видимость?</template>

				Это действие переключит видимость сборки >.
			</DialogComponent>

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
import { useStore } from '@/store/useStore';
import { IPopUp } from '@/components/popup/type';
import { createPopUp, deletePopUp } from '@/components/popup/utils';
import {
	POPUP_DELETE_USER_SUCCESS,
	POPUP_DELETE_USER_ERROR,
} from '@/components/popup/data';
import DialogComponent from '@/components/ui/DialogComponent.vue';

export default defineComponent({
	components: { DialogComponent },
	setup() {
		const store = useStore();

		const dangerPopUp: IPopUp = {
			type: 'danger',
			title: 'Ахтунг!',
			desc: 'Все пошло не так!!!',
			duration: 1,
		};

		const warningPopUp: IPopUp = {
			type: 'warning',
			title: 'Нарушение стабильности кристалла Суперматерии',
			desc: 'Целостность кристалла 80%. Инженерному отделу необходимо вмешаться и стабилиризовать плазма-реакцию!',
		};

		const successPopUp: IPopUp = {
			type: 'success',
			title: 'Все хорошо',
			desc: '',
			duration: 10,
		};

		function createPopUpHandler(data: IPopUp) {
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
