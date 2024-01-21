import { createStore } from 'vuex';

export default createStore({
	state: {
		showLoginPopup: false,
		displayName: '',
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
		},
	},
});
