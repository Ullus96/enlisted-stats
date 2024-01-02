const BASE_STATS = {
	m: 4,
	v: 4,
	w: 4,
};

export function calculateStatsByLvl(
	stats: number[],
	level: 1 | 2 | 3 | 4 | 5
): number[] {
	const lvl1 = [
		stats[0] + BASE_STATS.m,
		stats[1] + BASE_STATS.v,
		stats[2] + BASE_STATS.w,
	];
	switch (level) {
		case 1:
			return lvl1;

		case 2:
			return [lvl1[0] + 2, lvl1[1] + 2, lvl1[2] + 2];
		case 3:
			return [lvl1[0] + 4, lvl1[1] + 4, lvl1[2] + 4];
		case 4:
			return [lvl1[0] + 6, lvl1[1] + 6, lvl1[2] + 6];
		case 5:
			return [lvl1[0] + 12, lvl1[1] + 12, lvl1[2] + 12];

		default:
			return stats;
	}
}
