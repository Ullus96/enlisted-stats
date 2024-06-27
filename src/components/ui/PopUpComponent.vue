<template>
	<template v-if="mounted">
		<Teleport to="#screen-bottom">
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
		</Teleport>
	</template>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
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
	setup() {
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});

		return {
			mounted,
		};
	},
});
</script>
