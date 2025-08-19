type TableProps = {
	columns: string[];
	rows: (string | number | React.ReactElement)[][];
};

export default function Table({ columns, rows }: TableProps) {
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
					{rows.map((row, index) => (
						<tr key={`${row}_${index}`}>
							{row.map((cell, cellIndex) => (
								<td
									key={`${cell}_${cellIndex}`}
									className="p-2 border-t border-gray-300"
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
