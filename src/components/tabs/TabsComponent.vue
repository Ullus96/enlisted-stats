<template>
	<div class="tabs">
		<button
			@click="setActiveTab(tab.id)"
			class="btn btn-tertiary tabs__tab"
			:class="{ active: activeTab === tab.id }"
			v-ripple
			v-for="(tab, idx) in tabs"
			:key="`${tab}-${idx}`"
		>
			{{ tab.text }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref } from 'vue';
import { TabsStructure } from './types';

export default defineComponent({
	props: {
		tabs: {
			required: true,
			type: Array as PropType<TabsStructure>,
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

		onMounted(() => {
			if (props.defaultTab && allowedIds.includes(props.defaultTab)) {
				setActiveTab(props.defaultTab);
			}
		});

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
