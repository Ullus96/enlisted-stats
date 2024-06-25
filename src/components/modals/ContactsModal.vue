<template>
	<ModalComponent :modalName="'isContactsModalVisible'">
		<h3 class="modal__title">Связаться с автором сайта</h3>
	</ModalComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalComponent from '@/components/ui/ModalComponent.vue';

export default defineComponent({
	components: {
		ModalComponent,
	},
	setup() {
		return {};
	},
});
</script>
