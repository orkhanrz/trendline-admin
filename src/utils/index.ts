export function getRowNumber(
	data: { [key: string]: number | string }[],
	index: number,
	itemsToShow: number,
	page: number
): number {
	const length = data.length;

	return Math.floor(length / itemsToShow) + index;
}
