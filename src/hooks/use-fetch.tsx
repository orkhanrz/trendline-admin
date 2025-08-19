import { useEffect, useState } from "react";

export default function useFetch(url: string) {
	const [state, setState] = useState<{
		isLoading: boolean;
		data: [];
		error: null | string;
	}>({
		isLoading: true,
		data: [],
		error: null,
	});

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				console.log(response);
				throw new Error("Failed to fetch!");
			}

			const data = await response.json();
			setState((prev) => ({ ...prev, data: data }));
		} catch (error) {
			if (error instanceof Error) {
				setState((prev) => ({
					...prev,
					error: error.message || "Something went wrong!",
				}));
			}
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }));
		}
	}

	return {
		data: state.data,
		error: state.error,
		isLoading: state.isLoading,
		refetch: fetchData,
	};
}
