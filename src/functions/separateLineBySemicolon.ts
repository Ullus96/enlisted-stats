export function separateLineBySemicolon(line: string) {
	if (!line) return ['—'];
	return line.split(';');
}
