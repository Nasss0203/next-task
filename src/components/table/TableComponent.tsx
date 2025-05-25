"use client";
import { useGetAllTasks, useTasksByUserProjects } from "@/hooks/useTask";
import { useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

const TableComponent = ({ status }: { status?: "todo" | "done" | "doing" }) => {
	console.log(" status~", status);

	const { user } = useUser();
	const role = user?.role;

	const { data: allTasks } = useTasksByUserProjects();
	const { data: allData } = useGetAllTasks({});

	let tasks = [];
	if (role === "admin" || role === "manager") {
		tasks =
			allData?.filter((task: any) => !status || task.status === status) ||
			[];
	} else if (role === "member") {
		tasks =
			allTasks?.filter(
				(task: any) => !status || task.status === status,
			) || [];
	}

	console.log("tasks~", tasks);

	return (
		<div className='container mx-auto bg-white p-5 rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-bold'>
					{status === "todo"
						? "To do"
						: status === "doing"
						? "In progress"
						: "Done"}{" "}
					<span className='text-gray-500'>({tasks.length})</span>
				</h2>
				<button className='text-blue-500 hover:underline'>
					<Plus />
				</button>
			</div>
			<DataTable columns={columns} data={tasks} />
		</div>
	);
};

export default TableComponent;
