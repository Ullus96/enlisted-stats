export function getLocalStorageUsersDataByKeyAndValue(
	data: any[],
	key: string,
	keyValue: any,
	returnKey: string
) {
	for (const item of data) {
		if (
			item.hasOwnProperty(key) &&
			item[key] === keyValue &&
			item.hasOwnProperty(returnKey)
		) {
			return item[returnKey];
		}
	}
	return undefined;
}
