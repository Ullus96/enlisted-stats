<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="closeModal">
			<section class="modal" @click.stop>
				<button
					class="btn btn-tertiary btn-sm modal__btn"
					@click="closeModal"
					@keydown.esc="closeModal"
					v-focus
					v-ripple
				>
					<IconBase>
						<IconTimes />
					</IconBase>
				</button>

				<h3 class="modal__title" v-if="slots.title">
					<slot name="title"> </slot>
				</h3>

				<div class="modal__body" v-if="slots.body">
					<slot name="body"></slot>
				</div>

				<slot name="default"></slot>

				<div class="modal__footer" v-if="slots.footer || closeBtn">
					<slot name="footer"></slot>
					<button
						v-if="closeBtn"
						class="btn btn-m"
						:class="`btn-${closeBtn.variant}`"
						@click="closeModal"
					>
						{{ closeBtn.text }}
					</button>
				</div>
			</section>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, useSlots } from 'vue';
import { IModalState } from '@/store/index';
import { IModalCloseBtn } from './types';
import { useStore } from '@/store/useStore';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconTimes from '@/components/ui/icon/icons/IconTimes.vue';

export default defineComponent({
	props: {
		modalName: {
			required: true,
			type: String as PropType<keyof IModalState>,
		},
		closeBtn: {
			required: false,
			type: Object as PropType<IModalCloseBtn>,
		},
	},
	components: { IconBase, IconTimes },
	setup(props, context) {
		const slots = useSlots();
		const store = useStore();

		function closeModal() {
			store.commit('toggleModalVisibility', {
				name: props.modalName,
				forceClose: true,
			});
		}

		return { slots, closeModal };
	},
});
</script>
