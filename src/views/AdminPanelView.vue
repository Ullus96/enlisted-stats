<template>
	<!-- <div class="profile__body">
			<p v-if="!activeTab">Выбери какой-нибудь пункт</p>
			<admin-events v-if="activeTab == 'events'"></admin-events>
		</div>
	</div>  -->
	<div class="container mt-l">
		<div class="container-sm">
			<h3>Панель администратора</h3>

			<div class="admin__tabs">
				<button
					@click="setActiveTab('events')"
					class="btn btn-tertiary admin__tab"
					:class="{ active: activeTab == 'events' }"
				>
					События
				</button>
			</div>

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

export default defineComponent({
	components: { AdminEvents },
	setup() {
		type TActiveTab = 'events' | 'placeholder';
		const activeTab: Ref<TActiveTab | null> = ref(null);
		const animationStart: Ref<boolean> = ref(false);

		function setActiveTab(name: TActiveTab) {
			activeTab.value = name;
		}

		return {
			activeTab,
			setActiveTab,
			animationStart,
		};
	},
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: opacity 0.4s ease-in-out, transform 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(-10rem);
	opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
	transform: translateX(0rem);
	opacity: 1;
}
</style>
