import { createRouter, createWebHistory } from 'vue-router';
import SoldiersView from '@/views/SoldiersView.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: SoldiersView,
		},
		{
			path: '/events',
			component: () => import('@/views/EventsView.vue'),
		},
		{
			path: '/calculator',
			component: () => import('@/views/CustomCalculatorView.vue'),
		},
		{
			path: '/skill-builds',
			component: () => import('@/views/SkillBuildsView.vue'),
		},
		{
			path: '/my-builds',
			component: () => import('@/views/MyBuildsView.vue'),
		},
		{
			path: '/saved-builds',
			component: () => import('@/views/SavedBuildsView.vue'),
		},
		{
			path: '/profile',
			component: () => import('@/views/ProfileView.vue'),
		},
	],
});
