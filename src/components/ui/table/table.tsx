type TableProps = {
	columns: string[];
	rows: (string | number | React.ReactElement)[][];
};

export default function Table({ columns, rows }: TableProps) {
	return (
		<table className="w-full border-collapse text-sm">
			<thead className="bg-gray-100">
				<tr>
					{columns.map((col) => (
						<th
							key={col}
							className="p-2 border border-gray-300 text-left bg-gray-100"
						>
							{col}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<tr key={`${index}`}>
						{row.map((cell, cellIndex) => (
							<td
								key={`${cellIndex}`}
								className="p-2 border border-gray-300"
							>
								{cell}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
