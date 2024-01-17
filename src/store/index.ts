import { createStore } from 'vuex';

export default createStore({
	state: {
		showLoginPopup: false,
	},
	mutations: {
		showLoginPopup(state) {
			state.showLoginPopup = true;
		},
		closeLoginPopup(state) {
			state.showLoginPopup = false;
		},
	},
});
