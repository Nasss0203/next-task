"use client";
import { useUser } from "@/hooks/useUser";
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
	{
		path: "messenger",
		name: "Messenger",
		icon: <MdSms />,
		roles: ["admin", "manager", "member"],
	},
	{
		path: "settings",
		name: "Settings",
		icon: <IoSettingsSharp />,
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
	const { user } = useUser();
	const role = user?.role;

	// Lọc các mục sidebar dựa trên vai trò của người dùng
	const filteredSidebar = role
		? sidebar.filter((item) => item.roles.includes(role)) // Hiển thị mục theo vai trò
		: defaultSidebar; // Nếu chưa đăng nhập, hiển thị tất cả các mục

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
