<template>
	<ModalComponent @closeModal="close">
		<h3 class="modal__title">Связаться с автором сайта</h3>
	</ModalComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ModalComponent from '@/components/ui/ModalComponent.vue';

export default defineComponent({
	components: {
		ModalComponent,
	},
	setup() {
		const store = useStore();

		function close() {
			store.commit('toggleModalVisibility', {
				name: 'isContactsModalVisible',
				forceClose: true,
			});
		}

		return { close };
	},
});
</script>
