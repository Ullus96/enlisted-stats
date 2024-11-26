<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="closeDialog"></div>
		<section class="modal">
			<button
				class="btn btn-tertiary btn-sm modal__btn"
				@click="closeDialog"
				@keydown.esc="closeDialog"
				ref="closeBtn"
			>
				<IconBase>
					<IconTimes />
				</IconBase>
			</button>

			<h3 class="dialog__title" v-if="slots.title">
				<slot name="title"></slot>
			</h3>

			<p class="dialog__desc" v-if="slots.default">
				<slot> </slot>
			</p>

			<div class="dialog__buttons">
				<button
					class="btn btn-m"
					:class="`btn-${yes.type}`"
					@click="confirmDialog"
				>
					{{ yes.text }}
				</button>
				<button
					class="btn btn-m"
					:class="`btn-${no.type}`"
					@click="closeDialog"
				>
					{{ no.text }}
				</button>
			</div>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, useSlots } from 'vue';
import { IDialogState } from '@/store/index';
import { useStore } from '@/store/useStore';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconTimes from '@/components/ui/icon/icons/IconTimes.vue';

export default defineComponent({
	props: {
		dialogName: {
			required: true,
			type: String as PropType<keyof IDialogState>,
		},
		yes: {
			required: false,
			type: Object as PropType<{
				text: string;
				type: 'primary' | 'secondary' | 'tertiary';
			}>,
			default: {
				text: 'Да',
				type: 'primary',
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
		const slots = useSlots();

		function closeDialog() {
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
			closeDialog();
		}

		return { slots, closeDialog, closeBtn, confirmDialog };
	},
});
</script>
