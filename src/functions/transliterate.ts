const latToCyr: Record<string, string> = {
	// строчные буквы
	f: 'а',
	',': 'б',
	d: 'в',
	u: 'г',
	l: 'д',
	t: 'е',
	'`': 'ё',
	';': 'ж',
	p: 'з',
	b: 'и',
	q: 'й',
	r: 'к',
	k: 'л',
	v: 'м',
	y: 'н',
	j: 'о',
	g: 'п',
	h: 'р',
	c: 'с',
	n: 'т',
	e: 'у',
	a: 'ф',
	'[': 'х',
	w: 'ц',
	x: 'ч',
	i: 'ш',
	o: 'щ',
	']': 'ъ',
	s: 'ы',
	m: 'ь',
	"'": 'э',
	'.': 'ю',
	z: 'я',
	// заглавные буквы
	F: 'А',
	'<': 'Б',
	D: 'В',
	U: 'Г',
	L: 'Д',
	T: 'Е',
	'~': 'Ё',
	':': 'Ж',
	P: 'З',
	B: 'И',
	Q: 'Й',
	R: 'К',
	K: 'Л',
	V: 'М',
	Y: 'Н',
	J: 'О',
	G: 'П',
	H: 'Р',
	C: 'С',
	N: 'Т',
	E: 'У',
	A: 'Ф',
	'{': 'Х',
	W: 'Ц',
	X: 'Ч',
	I: 'Ш',
	O: 'Щ',
	'}': 'Ъ',
	S: 'Ы',
	M: 'Ь',
	'"': 'Э',
	'>': 'Ю',
	Z: 'Я',
};

export function transliterate(input: string) {
	return input
		.split('')
		.map((char) => latToCyr[char] || char)
		.join('');
}

export function transliterateWithRomanCheck(input: string) {
	const romanNumerals = ['I', 'II', 'III', 'IV'];
	const words = input.split(' ');

	return words
		.map((word) => {
			// Римскую цифру не трогаем
			if (romanNumerals.includes(word)) {
				return word;
			}

			return word
				.split('')
				.map((char) => latToCyr[char] || char)
				.join('');
		})
		.join(' ');
}
