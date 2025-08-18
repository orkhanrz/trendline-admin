import { ChartBarStacked, PackageSearch, Tag } from "lucide-react";
import SidebarLink from "./sidebar-link";

export default function Sidebar() {
	return (
		<div className="bg-gray-50 w-2/12 p-6 shadow-md">
			<h1 className="text-xl text-center mb-4 font-medium">Dashboard</h1>
			<nav>
				<ul>
					<SidebarLink
						name="Categories"
						href="/dashboard/categories"
						icon={<ChartBarStacked />}
					/>
					<SidebarLink
						name="Brands"
						href="/dashboard/brands"
						icon={<Tag />}
					/>
					<SidebarLink
						name="Products"
						href="/dashboard/products"
						icon={<PackageSearch />}
					/>
				</ul>
			</nav>
		</div>
	);
}
