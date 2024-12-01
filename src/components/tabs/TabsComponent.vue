<template>
	<div class="tabs">
		<button
			@click="setActiveTab(item.id)"
			class="btn btn-tertiary tabs__tab"
			:class="{ active: activeTab === item.id }"
			v-ripple
			v-for="(item, idx) in tabs"
			:key="`${item}-${idx}`"
		>
			{{ item.text }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		tabs: {
			required: true,
			type: Array as PropType<{ id: string; text: string }[]>,
		},
		defaultTab: {
			required: false,
			type: String as PropType<string>,
		},
	},
	setup(props, context) {
		const allowedIds = props.tabs.map((el) => el.id);
		type TabId = (typeof props.tabs)[number]['id'];
		const activeTab: Ref<TabId | null> = ref(null);

		if (props.defaultTab && allowedIds.includes(props.defaultTab)) {
			setActiveTab(props.defaultTab);
		}

		function setActiveTab(name: TabId) {
			activeTab.value = name;
			context.emit('setActiveTab', name);
		}

		return {
			activeTab,
			setActiveTab,
		};
	},
});
</script>

<style scoped></style>
