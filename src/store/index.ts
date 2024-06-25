import { createStore } from 'vuex';

export interface ModalState {
	isLoginModalVisible: boolean;
	isContactsModalVisible: boolean;
}
export interface State {
	showLoginPopup: boolean;
	displayName: string;
	inDevelop: boolean;
	isNavigationVisible: boolean;
	modal: ModalState;
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
		modal: {
			isLoginModalVisible: false,
			isContactsModalVisible: false,
		},
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

		clearUserData(state) {
			state.user.isLoggedIn = false;
			state.user.uid = null;
			state.user.displayName = null;
			state.user.photoUrl = null;
			state.user.isAdmin = false;
		},

		finishFirstAuthInitialization(state) {
			state.loading.isAuthInitialized = true;
		},

		toggleNavigationVisibility(state, forceClose: boolean = false) {
			if (forceClose) {
				state.isNavigationVisible = false;
				return;
			}
			state.isNavigationVisible = !state.isNavigationVisible;
		},

		toggleModalVisibility(
			state,
			payload: {
				name: keyof State['modal'];
				forceClose: boolean | undefined;
			}
		) {
			const { name, forceClose } = payload;
			console.log(payload);
			if (forceClose) {
				state.modal[name] = false;
				return;
			}

			state.modal[name] = !state.modal[name];
		},
	},
});
