<template>
	<div class="container-sm mt-s">
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
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import AdminEvents from '@/components/admin/AdminEvents.vue';
import LowerPopUp from '@/components/error/LowerPopUp.vue';

export default defineComponent({
	components: { LowerPopUp, AdminEvents },
	setup() {
		type TActiveTab = 'events' | 'users';
		const activeTab: Ref<TActiveTab | null> = ref(null);

		function setActiveTab(name: TActiveTab) {
			activeTab.value = name;
		}

		return {
			activeTab,
			setActiveTab,
		};
	},
});
</script>
