"use client";

import { ChartBarStacked, MenuIcon, PackageSearch, Tag } from "lucide-react";
import { useState } from "react";
import SidebarLink from "./sidebar-link";

const sidebarLinks = [
	{
		name: "Categories",
		href: "/dashboard/categories",
		icon: <ChartBarStacked />,
	},
	{
		name: "Brands",
		href: "/dashboard/brands",
		icon: <Tag />,
	},
	{
		name: "Products",
		href: "/dashboard/products",
		icon: <PackageSearch />,
	},
];

export default function Sidebar() {
	const [isVisible, setIsVisible] = useState(true);

	// const screenWidth = window.innerWidth;

	// function toggleSidebar() {
	// 	setIsVisible(true);
	// }

	// useEffect(() => {
	// 	if (screenWidth > 768) {
	// 		setIsVisible(true);
	// 	}
	// }, [screenWidth]);

	return (
		<>
			{!isVisible && (
				<div className="p-6 bg-gray-50">
					<button
						className="bg-blue-500 p-1 rounded-sm cursor-pointer"
						// onClick={toggleSidebar}
					>
						<MenuIcon color="#FFFFFF" />
					</button>
				</div>
			)}

			<div
				className={`bg-gray-50 w-80 p-6  ${
					isVisible ? "block" : "hidden"
				}`}
			>
				<h1 className="text-xl text-center mb-4 font-medium">
					Dashboard
				</h1>
				<nav>
					<ul>
						{sidebarLinks.map((link) => (
							<SidebarLink
								key={link.name}
								name={link.name}
								href={link.href}
								icon={link.icon}
							/>
						))}
					</ul>
				</nav>
			</div>
		</>
	);
}
