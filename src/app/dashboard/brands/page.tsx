import NoData from "@/components/ui/no-data";
import Table from "@/components/ui/table";
import { config } from "@/constants/config";

const columns = ["Id", "Name", "Description", "Logo", ""];

export default async function BrandsPage() {
	const response = await fetch(config.apiBaseUrl + "/brands");
	const data = await response.json();

	return (
		<>
			<h1 className="text-2xl font-bold mb-4">Brands</h1>

			{data.length === 0 ? (
				<NoData />
			) : (
				<Table columns={columns} data={data} />
			)}
		</>
	);
}
