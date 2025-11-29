import { config } from "@/constants/config";

export function getRowNumber(
	data: { [key: string]: number | string }[],
	index: number,
	itemsToShow: number
	// page: number
): number {
	const length = data.length;

	return Math.floor(length / itemsToShow) + index;
}

export function createImageFile(imageUrl: string) {
	const url = `${config.minioBaseUrl}/${imageUrl}`;
	const file = new File([], url);

	return file;
}

export async function apiFetch(url: string, options?: RequestInit) {
	const response = await fetch(url, { credentials: "include", ...options });

	console.log(response);

	if (response.status == 401) {
		window.location.href = "/";
	}

	return response;
}
