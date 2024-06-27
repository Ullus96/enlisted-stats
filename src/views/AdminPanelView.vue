<template>
	<!-- <div class="container-sm mt-s">
		<div class="profile__header-admin">
			<h1 class="profile__header-title">Панель администратора</h1>
			<div class="profile__tabs">
				<button
					class="btn profile__tab"
					@click="setActiveTab('events')"
					:class="{ active: activeTab == 'events' }"
				>
					События
				</button>
				<button
					class="btn profile__tab"
					@click="setActiveTab('users')"
					:class="{ active: activeTab == 'users' }"
				>
					/// no data ///
				</button>
			</div>
		</div>

		<div class="profile__body">
			<p v-if="!activeTab">Выбери какой-нибудь пункт</p>
			<admin-events v-if="activeTab == 'events'"></admin-events>
		</div>
	</div> -->
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
				<button
					@click="setActiveTab('placeholder')"
					class="btn btn-tertiary admin__tab"
					:class="{ active: activeTab == 'placeholder' }"
				>
					Placeholder
				</button>
			</div>

			<transition name="slide-fade" mode="out-in">
				<section v-if="!activeTab" key="no-category" class="admin__category">
					<p class="admin__category-title">Выбери какую-либо категорию</p>
				</section>

				<section
					v-else-if="activeTab === 'events'"
					key="events"
					class="admin__category"
				>
					<p class="admin__category-title">События</p>
				</section>

				<section
					v-else-if="activeTab === 'placeholder'"
					key="placeholder"
					class="admin__category"
				>
					<p class="admin__category-title">Что-то еще</p>
				</section>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import AdminEvents from '@/components/admin/AdminEvents.vue';
import LowerPopUp from '@/components/error/LowerPopUp.vue';

export default defineComponent({
	components: { LowerPopUp, AdminEvents },
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

<style>
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
