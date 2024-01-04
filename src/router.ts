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
	],
});
