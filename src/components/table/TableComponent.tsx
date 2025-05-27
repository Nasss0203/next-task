"use client";
import { useGetAllTasks, useTasksByUserProjects } from "@/hooks/useTask";
import { useUser } from "@/hooks/useUser";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

const TableComponent = ({
	status,
}: {
	status?: "todo" | "done" | "doing" | "";
}) => {
	const { user } = useUser();
	const role = user?.role;

	const { data: allTasks } = useTasksByUserProjects();
	const { data: allData } = useGetAllTasks({});

	let tasks = [];
	if (role === "admin" || role === "manager") {
		tasks = Array.isArray(allData)
			? allData.filter((task: any) => !status || task.status === status)
			: [];
	} else if (role === "member") {
		tasks = Array.isArray(allTasks)
			? allTasks.filter((task: any) => !status || task.status === status)
			: [];
	}

	return (
		<div className='container w-full bg-white p-5 rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>
					{status === "todo"
						? "To do"
						: status === "doing"
						? "In progress"
						: status === "done"
						? "Done"
						: "Task"}
					{` `}
					<span className='text-gray-500'>({tasks.length})</span>
				</h2>
			</div>
			<div className='w-full'>
				<DataTable columns={columns} data={tasks} />
			</div>
		</div>
	);
};

export default TableComponent;
