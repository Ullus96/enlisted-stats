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
import { defineComponent } from 'vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconTimes from '@/components/ui/icons/IconTimes.vue';

export default defineComponent({
	components: { IconBase, IconTimes },
	emits: ['closeModal'],
	setup(props, context) {
		function closeModal() {
			context.emit('closeModal');
		}

		return { closeModal };
	},
});
</script>
