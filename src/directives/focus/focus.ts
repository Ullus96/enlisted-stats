import { Directive } from 'vue';
import { validateAndNormalizeBinding } from './validation';

const Focus: Directive = {
	mounted(el, binding) {
		const { onMount } = validateAndNormalizeBinding(binding.value);

		if (onMount) {
			el.focus();
		}
	},

	updated(el, binding) {
		const { onUpdate } = validateAndNormalizeBinding(binding.value);

		if (onUpdate) {
			el.focus();
		}
	},
};

export default Focus;
