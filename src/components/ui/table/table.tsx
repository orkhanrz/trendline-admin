type TableProps = {
	columns: string[];
	rows: (string | number | React.ReactElement)[][];
};

export default function Table({ columns, rows }: TableProps) {
	return (
		<div className="h-screen overflow-hidden text-sm">
			{/* Full height scrollable container */}
			<div className="max-h-full h-fit overflow-y-auto rounded-2xl  border border-gray-300 shadow-sm">
				<table className="w-full border-collapse">
					<thead className="sticky top-0 bg-gray-100 z-10">
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
			</div>
		</div>
	);
}
