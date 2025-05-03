<template>
	<details :open="isOpen" class="faq__item">
		<summary @click.prevent="handleClick" v-ripple>
			<div class="faq__title">
				<span v-text="title" class="faq__title-text"></span>
				<IconBase class="faq__expand">
					<IconPlus v-if="!isOpen" />
					<IconMinus v-else />
				</IconBase>
			</div>
		</summary>
		<div class="faq__content">
			<slot></slot>
		</div>
	</details>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, Ref } from 'vue';
import IconBase from '../ui/icon/IconBase.vue';
import IconPlus from '../ui/icon/icons/IconPlus.vue';
import IconMinus from '../ui/icon/icons/IconMinus.vue';

export default defineComponent({
	components: { IconBase, IconPlus, IconMinus },
	props: {
		title: {
			required: true,
			type: String,
		},
	},
	emits: ['handleClick'],
	setup() {
		const openedIndex = inject('openedIndex') as Ref<number | null>;
		const setOpenedIndex = inject('setOpenedIndex') as (
			index: number | null
		) => void;
		const registerItem = inject('registerItem') as () => number;

		const index: Ref<number | null> = ref(null);

		onMounted(() => {
			index.value = registerItem();
		});

		const isOpen = computed(() => openedIndex.value === index.value);

		function handleClick() {
			if (isOpen.value) {
				setOpenedIndex(null);
			} else if (index.value !== null) {
				setOpenedIndex(index.value);
			}
		}

		return { isOpen, handleClick };
	},
});
</script>

<style scoped></style>
