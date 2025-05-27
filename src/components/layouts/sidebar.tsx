"use client";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaListUl } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

const sidebar = [
	{
		path: "",
		name: "Dashboard",
		icon: <MdDashboard />,
		roles: ["admin", "manager"],
	},
	{
		path: "list",
		name: "List",
		icon: <FaListUl />,
		roles: ["admin", "manager", "member"],
	},
	{
		path: "task",
		name: "Task",
		icon: <GrTasks />,
		roles: ["admin", "manager", "member"],
	},
];

const defaultSidebar = [
	{
		path: "",
		name: "Dashboard",
		icon: <MdDashboard />,
	},
	{
		path: "list",
		name: "List",
		icon: <FaListUl />,
	},
	{
		path: "task",
		name: "Task",
		icon: <GrTasks />,
	},
];

const Sidebar = () => {
	const pathname = usePathname();
	const { user } = useUser();
	const role = user?.role;

	const filteredSidebar = role
		? sidebar.filter((item) => item.roles.includes(role))
		: defaultSidebar;

	return (
		<div className='flex flex-col bg-white border-r'>
			<div className='font-bold text-xl text-black p-5'>
				Task Management
			</div>
			<div className='w-[250px] px-4 py-6 flex flex-col h-full shadow'>
				{filteredSidebar.map((item) => {
					const isActive =
						pathname === "/" + item.path ||
						pathname.startsWith("/" + item.path + "/");

					return (
						<Link
							href={`/${item.path}`}
							className={`rounded-xl px-6 py-4 flex items-center gap-2.5 text-base font-bold ${
								isActive
									? "bg-[#475BE8] text-white"
									: "bg-white text-gray-500"
							}`}
							key={item.name}
						>
							{item.icon}
							{item.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
