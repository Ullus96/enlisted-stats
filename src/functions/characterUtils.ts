const BASE_STATS = {
	mobility: 4,
	vitality: 4,
	weapon_handling: 4,
};

export function calculateStatsByLvl(
	stats: number[],
	level: 1 | 2 | 3 | 4 | 5
): number[] {
	const modifiers = [0, 2, 4, 6, 12];
	const baseStats = Object.values(BASE_STATS);

	return stats.map(
		(stat, index) => stat + baseStats[index] + modifiers[level - 1]
	);
}
