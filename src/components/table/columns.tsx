"use client";

import { ColumnDef } from "@tanstack/react-table";

// Định nghĩa kiểu dữ liệu
export type Task = {
	id: string;
	title: string;
	description: string;
	due_date: string;
	priority: string;
	status: string;
	assigned_users: { id: string; username: string; email: string }[];
};

// Định nghĩa các cột cho bảng
export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: "title",
		header: "Task Name",
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<span
				className='block truncate'
				style={{ maxWidth: "200px" }} // Giới hạn chiều rộng
				title={row.original.description} // Hiển thị tooltip khi hover
			>
				{row.original.description || "-"}
			</span>
		),
	},
	{
		accessorKey: "due_date",
		header: "Estimation",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<span
				className={`px-2 py-1 rounded ${
					row.original.status === "todo"
						? "bg-gray-100 text-gray-700"
						: row.original.status === "doing"
						? "bg-blue-100 text-blue-700"
						: "bg-green-100 text-green-700"
				}`}
			>
				{row.original.status}
			</span>
		),
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.original.priority;
			const priorityColors: Record<string, string> = {
				low: "bg-blue-100 text-blue-700",
				medium: "bg-yellow-100 text-yellow-700",
				high: "bg-red-100 text-red-700",
				urgent: "bg-red-200 text-red-800",
			};
			return (
				<span
					className={`px-2 py-1 rounded ${
						priorityColors[priority] || ""
					}`}
				>
					{priority}
				</span>
			);
		},
	},
	{
		accessorKey: "assigned_users",
		header: "People",
		cell: ({ row }) => (
			<div className='flex -space-x-2'>
				{row.original.assigned_users.map((user) => (
					<img
						key={user.id}
						src={`https://via.placeholder.com/24`} // Thay bằng avatar nếu có
						alt={user.username}
						className='w-6 h-6 rounded-full border-2 border-white'
					/>
				))}
			</div>
		),
	},
];
