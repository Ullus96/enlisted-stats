<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="closeModal"></div>
		<section class="modal">
			<button
				class="btn btn-tertiary btn-sm modal__btn"
				@click="closeModal"
				ref="closeBtn"
			>
				<IconBase>
					<IconTimes />
				</IconBase>
			</button>

			<slot></slot>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { ModalState } from '@/store/index';
import { useStore } from '@/store/useStore';
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

		const closeBtn: Ref<null | HTMLButtonElement> = ref(null);
		function focusCloseBtn() {
			if (closeBtn.value) {
				closeBtn.value.focus();
			}
		}

		onMounted(focusCloseBtn);

		return { closeModal, closeBtn };
	},
});
</script>
