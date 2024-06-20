import { createStore } from 'vuex';
export interface State {
	showLoginPopup: boolean;
	displayName: string;
	inDevelop: boolean;
	user: {
		isLoggedIn: boolean;
		uid: string | null;
		displayName: string | null;
		photoUrl: string | null;
	};
}

export default createStore<State>({
	state: {
		showLoginPopup: false,
		displayName: '',
		inDevelop: !false,
		user: {
			isLoggedIn: false,
			uid: null,
			displayName: null,
			photoUrl: null,
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
		},
	},
});
