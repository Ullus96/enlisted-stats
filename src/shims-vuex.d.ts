// src/shims-vuex.d.ts
import { Store } from 'vuex';
import { ComponentCustomProperties } from 'vue';
import { State } from './store'; // импортируй типы твоего состояния из хранилища

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
