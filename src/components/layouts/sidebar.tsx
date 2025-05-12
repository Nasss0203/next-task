"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaListUl } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard, MdSms } from "react-icons/md";

const sidebar = [
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
	{
		path: "messenger",
		name: "Messenger",
		icon: <MdSms />,
	},
	{
		path: "settings",
		name: "Settings",
		icon: <IoSettingsSharp />,
	},
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className='w-[250px] px-4 py-6 flex flex-col bg-white h-screen'>
			{sidebar.map((item) => {
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
	);
};

export default Sidebar;
