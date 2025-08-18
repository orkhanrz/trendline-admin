import { config } from "@/constants/config";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

type DataItem = {
	[key: string]: string | number;
};

type TableProps = {
	columns: string[];
	data: DataItem[];
};

export default function Table({ columns, data }: TableProps) {
	function renderCell(value: string | number, key: string) {
		const isImage =
			typeof value === "string" &&
			/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value);

		if (isImage) {
			return (
				<Image
					width={40}
					height={40}
					src={config.minioBaseUrl + value}
					alt={key}
				/>
			);
		}

		return value;
	}

	return (
		<div className="rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gray-100">
						{columns.map((col) => (
							<th
								key={col}
								className="p-2 border-1 border-gray-300 text-left"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={item.id}>
							{/* <td className="p-2 border-t border-gray-300">
								{getRowNumber(data, index, 5, 1)}
							</td> */}

							{Object.keys(item).map((key, index) => (
								<td
									key={`${item[key]}_${index}`}
									className="p-2 border-t border-gray-300"
								>
									{renderCell(item[key], key)}
								</td>
							))}

							<td className="p-2 border-t border-gray-300">
								<div className="flex items-center justify-center gap-2">
									<button>
										<Trash2
											className="text-red-500 cursor-pointer"
											size={18}
										/>
									</button>

									<button>
										<Pencil
											className="text-blue-600 cursor-pointer"
											size={18}
										/>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
