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

			<div class="dialog__buttons">
				<button
					class="btn btn-m"
					:class="`btn-${yes.type}`"
					@click="confirmDialog"
				>
					{{ yes.text }}
				</button>
				<button class="btn btn-m" :class="`btn-${no.type}`" @click="closeModal">
					{{ no.text }}
				</button>
			</div>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { IModalState } from '@/store/index';
import { useStore } from '@/store/useStore';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconTimes from '@/components/ui/icons/IconTimes.vue';

export default defineComponent({
	props: {
		dialogName: {
			required: true,
			type: String as PropType<keyof IModalState>,
		},
		yes: {
			required: false,
			type: Object as PropType<{
				text: string;
				type: 'primary' | 'secondary' | 'tertiary';
			}>,
			default: {
				text: 'Да',
				type: 'tertiary',
			},
		},
		no: {
			required: false,
			type: Object as PropType<{
				text: string;
				type: 'primary' | 'secondary' | 'tertiary';
			}>,
			default: {
				text: 'Отмена',
				type: 'tertiary',
			},
		},
	},
	emits: ['confirm'],
	components: { IconBase, IconTimes },
	setup(props, context) {
		const store = useStore();

		function closeModal() {
			store.commit('toggleDialogVisibility', {
				name: props.dialogName,
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

		function confirmDialog() {
			context.emit('confirm');
			closeModal();
		}

		return { closeModal, closeBtn, confirmDialog };
	},
});
</script>
