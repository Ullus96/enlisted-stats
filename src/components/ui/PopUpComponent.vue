<template>
	<section
		class="popup"
		:class="{
			danger: type === 'danger',
			warning: type === 'warning',
			success: type === 'success',
		}"
	>
		<button class="btn btn-tertiary btn-sm modal__btn">
			<IconBase :iconName="'Close pop-up'">
				<IconTimes />
			</IconBase>
		</button>
		<h2 class="popup__title">{{ title }}</h2>
		<p class="popup__desc" v-if="desc">
			{{ desc }}
		</p>
	</section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconTimes from '@/components/ui/icons/IconTimes.vue';

export default defineComponent({
	components: { IconBase, IconTimes },
	props: {
		type: {
			required: false,
			type: String as PropType<'danger' | 'warning' | 'success'>,
		},
		title: {
			required: true,
			type: String,
		},
		desc: {
			required: false,
			type: String,
		},
	},
	setup() {},
});
</script>
