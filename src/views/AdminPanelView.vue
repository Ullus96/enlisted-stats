<template>
	<div class="container mt-l">
		<div class="container-sm">
			<h3>Панель администратора</h3>

			<TabsComponent
				:tabs="tabsList"
				@setActiveTab="
					(val) => {
						activeTab = val;
					}
				"
			/>

			<transition name="slide-fade" mode="out-in">
				<AdminEvents v-if="activeTab === 'events'" key="events" />

				<section v-else key="no-category" class="admin__category">
					<p class="admin__category-title">Выбери какую-либо категорию</p>
				</section>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import AdminEvents from '@/components/admin/AdminEvents.vue';
import TabsComponent from '@/components/tabs/TabsComponent.vue';
import { TabsStructure } from '@/components/tabs/types';

export default defineComponent({
	components: { AdminEvents, TabsComponent },
	setup() {
		const tabsList: TabsStructure = [
			{
				id: 'events',
				text: 'События',
			},
		];

		const activeTab: Ref<(typeof tabsList)[number]['id'] | null> = ref(null);

		return {
			tabsList,
			activeTab,
		};
	},
});
</script>

<style scoped></style>
