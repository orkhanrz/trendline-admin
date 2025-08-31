import { useCallback, useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
	const [state, setState] = useState<{
		isLoading: boolean;
		data: T | null;
		error: null | string;
	}>({
		isLoading: true,
		data: null,
		error: null,
	});

	const fetchData = useCallback(
		async function () {
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
		},
		[url]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		data: state.data,
		error: state.error,
		isLoading: state.isLoading,
		refetch: fetchData,
	};
}
