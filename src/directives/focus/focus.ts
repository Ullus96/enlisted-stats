import { Directive } from 'vue';

const Focus: Directive = {
	mounted(el) {
		el.focus();
	},
};

export default Focus;
