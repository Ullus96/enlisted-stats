<template>
	<div class="cc__tag-item" :class="{ active: isActive }">
		<input
			type="checkbox"
			:name="item.name"
			:id="item.name"
			class="cc__tag-checkbox"
		/>
		<label :for="item.name" class="cc__tag-label" @click="isActive = !isActive"
			>&nbsp;</label
		>
		<i
			class="fa-solid fa-plus cc__tag-add-btn"
			:class="{ active: isActive }"
		></i>
		<p class="cc__tag-name">{{ item.name }}</p>
		<div class="cc__tag-tooltip">
			<p class="cc__tag-tooltip--description">
				{{ item.desc }}
			</p>
			<p class="cc__tag-tooltip--title">Кто использует:</p>
			<p class="cc__tag-tooltip-classes-flex">
				<img
					v-for="user in item.users"
					:key="user"
					:src="require('@/assets/soldier_icons/' + user + '.svg')"
				/>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import { ICCTagEntity } from '@/type/CCTags';

export default defineComponent({
	components: {},
	props: {
		item: { required: true, type: Object as PropType<ICCTagEntity> },
		tag: { required: true, type: String },
	},
	setup(props) {
		const isActive: Ref<boolean> = ref(false);

		return { isActive };
	},
});
</script>
