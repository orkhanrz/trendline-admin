"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

type SidebarLinkProps = {
	href: string;
	name: string;
	icon: React.ReactNode;
};

export default function SidebarLink({ href, name, icon }: SidebarLinkProps) {
	const pathname = usePathname();
	let classes = pathname === href ? "bg-blue-500 text-white" : "text-black";

	return (
		<li className={`rounded-xl mb-2 ${classes}`}>
			<Link href={href} className="flex items-center gap-3 p-3 ">
				{icon}
				<p className="font-medium">{name}</p>
			</Link>
		</li>
	);
}
