<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="closeModal"></div>
		<section class="modal">
			<button class="btn btn-tertiary btn-sm modal__btn" @click="closeModal">
				<IconBase :iconName="'Close modal window'">
					<IconTimes />
				</IconBase>
			</button>

			<slot></slot>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ModalState } from '@/store/index';
import { useStore } from 'vuex';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconTimes from '@/components/ui/icons/IconTimes.vue';

export default defineComponent({
	props: {
		modalName: {
			required: true,
			type: String as PropType<keyof ModalState>,
		},
	},
	components: { IconBase, IconTimes },
	setup(props, context) {
		const store = useStore();

		function closeModal() {
			store.commit('toggleModalVisibility', {
				name: props.modalName,
				forceClose: true,
			});
		}

		return { closeModal };
	},
});
</script>
