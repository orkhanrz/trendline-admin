import NoData from "@/components/ui/no-data";
import Table from "@/components/ui/table";
import { config } from "@/constants/config";

const columns: [] = [];

export default async function CategoriesPage() {
	const response = await fetch(config.apiBaseUrl + "/categories");
	const data = await response.json();

	return (
		<>
			<h1 className="text-2xl font-bold mb-4">Categories</h1>
			{data.length === 0 ? (
				<NoData />
			) : (
				<Table columns={columns} data={data} />
			)}
		</>
	);
}
