import { createStore } from 'vuex';
export interface State {
	showLoginPopup: boolean;
	displayName: string;
	inDevelop: boolean;
	isNavigationVisible: boolean;
	loading: {
		isAuthInitialized: boolean;
	};
	user: {
		isLoggedIn: boolean;
		uid: string | null;
		displayName: string | null;
		photoUrl: string | null;
		isAdmin: boolean;
	};
}

export default createStore<State>({
	state: {
		showLoginPopup: false,
		displayName: '',
		inDevelop: !false,
		isNavigationVisible: false,
		loading: {
			isAuthInitialized: false,
		},
		user: {
			isLoggedIn: false,
			uid: null,
			displayName: null,
			photoUrl: null,
			isAdmin: false,
		},
	},
	mutations: {
		showLoginPopup(state) {
			state.showLoginPopup = true;
		},

		closeLoginPopup(state) {
			state.showLoginPopup = false;
		},

		setNewDisplayName(state, payload) {
			state.displayName = payload;
			state.user.displayName = payload;
		},

		setUserData(state, payload) {
			state.user.isLoggedIn = true;
			state.user.uid = payload.uid;
			state.user.displayName = payload.displayName;
			state.user.photoUrl = payload.photoUrl;
			state.user.isAdmin = payload.isAdmin;
		},

		finishFirstAuthInitialization(state) {
			state.loading.isAuthInitialized = true;
		},

		toggleNavigationVisibility(state, forceOff: boolean = false) {
			if (forceOff) {
				state.isNavigationVisible = false;
				return;
			}
			state.isNavigationVisible = !state.isNavigationVisible;
		},
	},
});
