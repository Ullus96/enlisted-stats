import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { nextTick } from 'vue';
import IndexView from '@/views/IndexView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { checkIfUserAnAdmin } from '@/components/auth/functions/checkIfUserAnAdmin';
import { adminsList } from '../firebase/adminsList';

export interface ICustomRouteMeta {
	title: string;
	requiresAuth?: boolean;
	requiredAdminRights?: boolean;
}

const routes: Array<RouteRecordRaw & { meta?: ICustomRouteMeta }> = [
	{
		path: '/',
		name: 'Home',
		component: IndexView,
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
		path: '/build/:id',
		name: 'Build',
		component: () => import('@/views/SingleBuildView.vue'),
		meta: {
			title: 'Сборка',
		},
	},
	{
		path: '/test',
		name: 'Test page',
		component: () => import('@/views/TestView.vue'),
		meta: {
			title: 'Тестовая страница',
		},
	},
	{
		path: '/privacy',
		name: 'Privacy policy',
		component: () => import('@/views/legal/PrivacyView.vue'),
		meta: {
			title: 'Политика конфиденциальности',
		},
	},
	{
		path: '/user-agreement',
		name: 'User agreement',
		component: () => import('@/views/legal/UserAgreementView.vue'),
		meta: {
			title: 'Пользовательское соглашение',
		},
	},
	{
		path: '/licenses',
		name: 'Licenses',
		component: () => import('@/views/legal/LicensesView.vue'),
		meta: {
			title: 'Лицензии инструментов',
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
		path: '/settings',
		name: 'Settings',
		component: () => import('@/views/SettingsView.vue'),
		meta: {
			title: 'Настройки',
		},
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('@/views/AdminPanelView.vue'),
		meta: {
			title: 'Панель администратора',
			requiresAuth: true,
			requiredAdminRights: true,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'Not Found',
		component: () => import('@/views/404View.vue'),
		meta: {
			title: 'Страница не найдена',
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
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
		updateMetaTag('og:title', `Enlisted Stats - ${title}`);
		updateMetaTag('twitter:title', `Enlisted Stats - ${title}`);
	}

	if (to.matched.some((record) => record.meta.requiredAdminRights)) {
		try {
			const user: any = await getCurrentUser();
			const uid = user.uid;
			if (adminsList.includes(uid)) {
				next();
			} else {
				next('/');
			}
		} catch (error) {
			console.error('Error getting current user:', error);
			next('/');
		}
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

router.afterEach(() => {
	setTimeout(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, 0);
});

function updateMetaTag(name: string, content: string) {
	let tag = document.querySelector(`meta[property="${name}"]`);

	if (!tag) {
		tag = document.createElement('meta');
		if (name.startsWith('og:') || name.startsWith('twitter:')) {
			tag.setAttribute('property', name);
		}

		document.head.appendChild(tag);
	}

	tag.setAttribute('content', content);
}

export default router;
