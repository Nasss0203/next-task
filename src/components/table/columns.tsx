"use client";

import { useDeleteAssignment } from "@/hooks/useAssignment";
import { useProject } from "@/hooks/useProject";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type Task = {
	id: string;
	title: string;
	description: string;
	due_date: string;
	priority: string;
	status: string;
	assigned_users: { id: string; username: string; email: string }[];
};
export type Member = {
	id: string;
	username: string;
	email: string;
};

export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: "title",
		header: "Task Name",
		size: 200, // Đặt kích thước cố định cho cột
	},
	{
		accessorKey: "description",
		header: "Description",
		size: 300, // Đặt kích thước cố định cho cột
		cell: ({ row }) => (
			<span
				className='block truncate'
				style={{ maxWidth: "300px" }} // Giới hạn chiều rộng
				title={row.original.description} // Hiển thị tooltip khi hover
			>
				{row.original.description || "-"}
			</span>
		),
	},
	{
		accessorKey: "due_date",
		header: "Estimation",
		size: 150,
	},
	{
		accessorKey: "status",
		header: "Status",
		size: 150,
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
		size: 150, // Đặt kích thước cố định cho cột
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
		size: 200,
		cell: ({ row }) => (
			<div className='flex space-x-2'>
				{row.original.assigned_users.map((user) => (
					<Avatar key={user.id}>
						<AvatarImage src='' />
						<AvatarFallback>
							{user.username.slice(0, 3)}
						</AvatarFallback>
					</Avatar>
				))}
			</div>
		),
	},
];

export const memberColumnsTaskUser = (taskId: string): ColumnDef<Member>[] => [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => (
			<span className='text-sm text-gray-500 uppercase'>
				{row.original.id.slice(-4)}
			</span>
		),
		size: 150,
	},
	{
		accessorKey: "username",
		header: "Username",
		size: 200,
	},
	{
		accessorKey: "email",
		header: "Email",
		size: 300,
	},
	{
		id: "actions", // Đặt ID cho cột
		header: "Actions",
		cell: ({ row }) => {
			const user = row.original;
			const { deleteAssign } = useDeleteAssignment();

			return (
				<div className='flex space-x-2'>
					<button
						className='text-red-500 hover:underline'
						onClick={() =>
							deleteAssign({
								user_id: user.id,
								task_id: taskId,
							})
						}
					>
						Delete
					</button>
				</div>
			);
		},
		size: 150,
	},
];

export const memberColumnsUser = (projectId?: string): ColumnDef<Member>[] => [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => (
			<span className='text-sm text-gray-500 uppercase'>
				{row.original.id.slice(-4)}
			</span>
		),
		size: 150,
	},
	{
		accessorKey: "username",
		header: "Username",
		size: 200,
	},
	{
		accessorKey: "email",
		header: "Email",
		size: 300,
	},
	{
		id: "actions", // Đặt ID cho cột
		header: "Actions",
		cell: ({ row }) => {
			const user = row.original;
			const { deleteMember } = useProject();

			return (
				<div className='flex space-x-2'>
					<button
						className='text-red-500 hover:underline'
						onClick={() =>
							deleteMember({
								id: projectId,
								user_id: user.id,
							})
						}
					>
						Delete
					</button>
				</div>
			);
		},
		size: 150,
	},
];
