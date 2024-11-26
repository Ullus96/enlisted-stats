<template>
	<section
		class="popup"
		:class="{
			danger: type === 'danger',
			warning: type === 'warning',
			success: type === 'success',
		}"
	>
		<button class="btn btn-tertiary btn-sm modal__btn" @click="closePopup">
			<IconBase>
				<IconTimes />
			</IconBase>
		</button>
		<div class="popup__wrapper">
			<h2 class="popup__title" v-if="title">{{ title }}</h2>
			<p class="popup__desc" v-if="desc">
				{{ desc }}
			</p>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, PropType, onBeforeUnmount } from 'vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconTimes from '@/components/ui/icon/icons/IconTimes.vue';
import { deletePopUp } from '@/components/popup/utils';
import { useStore } from '@/store/useStore';

export default defineComponent({
	components: { IconBase, IconTimes },
	props: {
		type: {
			required: false,
			type: String as PropType<'danger' | 'warning' | 'success' | ''>,
		},
		title: {
			required: true,
			type: String,
		},
		desc: {
			required: false,
			type: String,
		},
		duration: {
			required: false,
			type: Number,
			default: 5,
		},
	},
	setup(props) {
		const store = useStore();
		const timer = setTimeout(() => {
			deletePopUp(store);
		}, props.duration * 1000);

		onBeforeUnmount(() => {
			clearTimeout(timer);
		});

		function closePopup() {
			deletePopUp(store);
		}

		return {
			closePopup,
		};
	},
});
</script>
