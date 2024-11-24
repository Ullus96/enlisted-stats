import { Store, useStore as baseUseStore } from 'vuex';
import { State } from './index';
import { storeKey } from './storeKey';

export function useStore(): Store<State> {
	return baseUseStore(storeKey);
}
