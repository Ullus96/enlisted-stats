import { INormalizedFocusValue, IFocusBindingValue } from './type';

export function validateAndNormalizeBinding(
	value: Partial<IFocusBindingValue> = {}
): INormalizedFocusValue {
	// валидация onMount/onUpdate значения
	function validateBooleanValue(
		bindingValue: boolean | undefined,
		defaultValue: boolean
	): boolean {
		return typeof bindingValue === 'boolean' ? bindingValue : defaultValue;
	}

	return {
		onMount: validateBooleanValue(value.onMount, true),
		onUpdate: validateBooleanValue(value.onUpdate, false),
	};
}
