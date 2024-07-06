import { createStore } from 'vuex';

export interface ModalState {
	isLoginModalVisible: boolean;
	isContactsModalVisible: boolean;
	isBuildSaveModalVisible: boolean;
}

export interface DialogState {
	isDeletingAccount: boolean;
	isDeletingEvent: boolean;
	isLoggingOut: boolean;
	isDeletingBuild: boolean;
}

export interface PopUp {
	type: 'danger' | 'warning' | 'success' | '';
	title: string;
	desc: string;
	duration?: number;
	id?: number;
}
export interface State {
	showLoginPopup: boolean;
	displayName: string;
	inDevelop: boolean;
	isNavigationVisible: boolean;
	isPopUpExists: boolean;
	popUpData: PopUp;
	modal: ModalState;
	dialog: DialogState;
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
		// TODO: после завершения редизайна, удалить это
		// свойство нахуй)) Оно в user.displayName дублировано
		displayName: '',
		inDevelop: !false,
		isNavigationVisible: false,
		isPopUpExists: false,
		popUpData: {
			type: '',
			title: '',
			desc: '',
			duration: 5,
			id: Math.random(),
		},
		modal: {
			isLoginModalVisible: false,
			isContactsModalVisible: false,
			isBuildSaveModalVisible: false,
		},
		dialog: {
			isDeletingAccount: false,
			isDeletingEvent: false,
			isLoggingOut: false,
			isDeletingBuild: false,
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

		toggleDialogVisibility(
			state,
			payload: {
				name: keyof State['dialog'];
				forceClose: boolean | undefined;
			}
		) {
			const { name, forceClose } = payload;
			console.log(payload);
			if (forceClose) {
				state.dialog[name] = false;
				return;
			}

			state.dialog[name] = !state.dialog[name];
		},

		createPopUp(state, payload: PopUp) {
			state.popUpData = { ...payload };
			state.popUpData.id = Math.random();
			state.isPopUpExists = true;
		},

		deletePopUp(state) {
			state.popUpData.type = '';
			state.popUpData.title = '';
			state.popUpData.desc = '';
			state.popUpData.duration = 5;
			state.popUpData.id = Math.random();
			state.isPopUpExists = false;
		},
	},
});
