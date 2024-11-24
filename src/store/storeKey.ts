import { InjectionKey } from 'vue';
import { Store } from 'vuex';
import { State } from './index';

export const storeKey: InjectionKey<Store<State>> = Symbol('vuex-key');
