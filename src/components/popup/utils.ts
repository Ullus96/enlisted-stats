import { PopUp } from '@/store';
import { Store } from 'vuex';

export function createPopUp(store: Store<any>, data: PopUp) {
	store.commit('deletePopUp');
	store.commit('createPopUp', data);
}

export function deletePopUp(store: Store<any>) {
	store.commit('deletePopUp');
}

/* Как юзать в компонентах:
function createPopUpHandler(data: PopUp) {
  createPopUp(store, data);
}

function deletePopUpHandler() {
  deletePopUp(store);
}
*/
