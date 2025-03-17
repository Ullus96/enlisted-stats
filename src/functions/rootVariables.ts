export type TRootVariables = '--ui-card-width';

export function updateRootVariable(variable: TRootVariables, newData: string) {
	if (!getRootVariable(variable)) return;

	document.documentElement.style.setProperty(variable, newData);
	// console.log(`${variable} value now is: ${newData}`);
}

export function getRootVariable(variable: TRootVariables) {
	const rootVariables = getComputedStyle(document.documentElement);
	const current = rootVariables.getPropertyValue(variable);

	// console.log(`${variable} value is: ${current}`);

	return current;
}
