import { createRouter, createWebHistory } from 'vue-router';
import SoldiersView from '@/views/SoldiersView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: SoldiersView,
			meta: {
				title: 'Таблица бойцов',
			},
		},
		{
			path: '/events',
			name: 'Events',
			component: () => import('@/views/EventsView.vue'),
			meta: {
				title: 'События',
			},
		},
		{
			path: '/calculator',
			name: 'Calculator',
			component: () => import('@/views/CustomCalculatorView.vue'),
			meta: {
				title: 'Калькулятор',
			},
		},
		{
			path: '/skill-builds',
			name: 'Skill builds',
			component: () => import('@/views/SkillBuildsView.vue'),
			meta: {
				title: 'Список сборок',
			},
		},
		{
			path: '/my-builds',
			name: 'My builds',
			component: () => import('@/views/MyBuildsView.vue'),
			meta: {
				title: 'Мои сборки',
				requiresAuth: true,
			},
		},
		{
			path: '/saved-builds',
			name: 'Saved builds',
			component: () => import('@/views/SavedBuildsView.vue'),
			meta: {
				title: 'Сохраненные сборки',
				requiresAuth: true,
			},
		},
		{
			path: '/profile',
			name: 'Profile',
			component: () => import('@/views/ProfileView.vue'),
			meta: {
				title: 'Профиль',
				requiresAuth: true,
			},
		},
	],
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	// Get the page title from the route meta data that we have defined
	const title: any = to.meta.title;
	// If the route has a title, set it as the page title of the document/page
	if (title) {
		document.title = title;
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			console.log('You are not signed in');
			next('/');
		}
	} else {
		next();
	}
});

export default router;
