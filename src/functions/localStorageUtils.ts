export function saveToLocalStorageArray(key: string, data: any) {
	// key
	const savedSkills = key;

	let itemsFromLocalStorage = loadFromLocalStorageArray(key);

	if (itemsFromLocalStorage) {
		itemsFromLocalStorage.push(data);
	} else {
		itemsFromLocalStorage = [data];
	}

	localStorage.setItem(savedSkills, JSON.stringify(itemsFromLocalStorage));
}

export function loadFromLocalStorageArray(key: string): any[] {
	const savedSkills = key;
	let itemsFromLocalStorage: any[] = [];

	const storedSkills = localStorage.getItem(savedSkills);

	if (storedSkills) {
		itemsFromLocalStorage = JSON.parse(storedSkills);
	}

	return itemsFromLocalStorage;
}

export function saveToLocalStorage(key: string, data: any) {
	const storageKey = key;
	localStorage.setItem(storageKey, JSON.stringify(data));
}

export function loadFromLocalStorage(key: string): any {
	const storageKey = key;
	let itemFromLocalStorage: any;

	const storedData = localStorage.getItem(storageKey);

	if (storedData) {
		itemFromLocalStorage = JSON.parse(storedData);
	}

	return itemFromLocalStorage;
}
