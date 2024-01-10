export function saveToLocalStorage(key: string, data: any) {
	// key
	const savedSkills = key;

	const itemsFromLocalStorage = loadFromLocalStorage(key);

	itemsFromLocalStorage.push(data);

	localStorage.setItem(savedSkills, JSON.stringify(itemsFromLocalStorage));
}

export function loadFromLocalStorage(key: string): any[] {
	const savedSkills = key;
	let itemsFromLocalStorage: any[] = [];

	const storedSkills = localStorage.getItem(savedSkills);

	if (storedSkills) {
		itemsFromLocalStorage = JSON.parse(storedSkills);
	}

	return itemsFromLocalStorage;
}
