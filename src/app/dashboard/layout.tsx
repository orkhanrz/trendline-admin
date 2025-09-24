import Sidebar from "@/components/ui/sidebar/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex justify-center items-center bg-gray-100">
			<div className="flex w-11/12 h-11/12 bg-white rounded-2xl overflow-hidden">
				<Sidebar />
				<div className="p-6 w-full overflow-scroll no-scrollbar">
					{children}
				</div>
			</div>
		</div>
	);
}
