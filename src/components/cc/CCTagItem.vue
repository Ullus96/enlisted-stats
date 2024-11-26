<template>
	<div
		class="cc__tag-item chip tooltip-anchor"
		:class="{ active: isActive }"
		v-ripple
	>
		<input
			type="checkbox"
			:name="item.name"
			:id="item.name"
			v-model="isActive"
			class="cc__tag-checkbox"
		/>
		<label :for="item.name" class="cc__tag-label" @click="handleClick()"
			>&nbsp;</label
		>
		<p>{{ item.name }}</p>
		<TooltipComponent :width="30">
			<p>
				{{ item.desc }}
			</p>
			<div class="cc__tag-line"></div>
			<p>Кто использует:</p>
			<p class="cc__tag-tooltip-classes-flex">
				<img
					v-for="user in item.users"
					:key="user"
					:src="require('@/assets/soldier_icons/' + user + '.svg')"
				/>
			</p>
		</TooltipComponent>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from 'vue';
import { ICCTagEntity } from '@/type/CCTags';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: { TooltipComponent },
	props: {
		item: { required: true, type: Object as PropType<ICCTagEntity> },
		tag: { required: true, type: String },
		activeTags: { required: false, type: Object },
	},
	setup(props, context) {
		const isActive = computed(
			() => props.activeTags?.includes(props.tag) ?? false
		);

		function handleClick() {
			if (isActive.value) {
				context.emit('tagClicked', { tag: props.tag, operation: 'remove' });
			} else {
				context.emit('tagClicked', { tag: props.tag, operation: 'add' });
			}
		}

		return { isActive, handleClick };
	},
});
</script>
