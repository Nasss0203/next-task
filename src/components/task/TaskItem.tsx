"use client";
import { useGetAllTasks, useTasksByUserProjects } from "@/hooks/useTask";
import { useUser } from "@/hooks/useUser";
import TaskDialog from "./TaskDialog";

const TaskItem = ({ status }: { status?: "todo" | "done" | "doing" }) => {
	const { user } = useUser();
	const role = user?.role;
	const { data } = useGetAllTasks({
		status,
	});

	// trả về danh sách project
	const { data: allTasks } = useTasksByUserProjects(status);
	console.log(`allTasks~${status}`, allTasks);

	let tasks;
	if (role === "admin" || role === "manager") {
		tasks = data;
	} else if (role === "member") {
		tasks =
			allTasks?.filter(
				(task: any) => !status || task.status === status,
			) || [];
	} else {
		tasks = [];
	}
	console.log(" tasks~", tasks);

	return (
		<>
			{tasks && tasks?.length > 0 ? (
				<>
					{tasks.map((item: any) => (
						<TaskDialog
							priority={item.priority}
							title={item.title}
							status={item.status}
							id={item.id}
							projectId={item.projectId}
							assigned_users={item.assigned_users}
							key={item.id}
						>
							<div className='flex flex-col space-y-3'>
								<div className='bg-white rounded-lg p-2 space-y-3 shadow-sm'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium line-clamp-1 text-left'>
											{item.title}
										</p>
										<div></div>
									</div>
									<div className='flex flex-wrap gap-1 text-xs'>
										<span
											className={`px-2 py-1 rounded-full font-semibold
			${
				item.priority === "low"
					? "bg-green-100 text-green-800"
					: item.priority === "medium"
					? "bg-yellow-100 text-yellow-800"
					: item.priority === "high"
					? "bg-red-100 text-red-800"
					: "bg-gray-100 text-gray-800"
			}
		`}
										>
											{item.priority}
										</span>
									</div>

									<hr />
									<div className='flex justify-between items-center text-sm text-gray-500'>
										<div className='flex -space-x-2'>
											{item.assigned_users?.length > 0
												? item.assigned_users?.length
												: 0}
											{` `}members
										</div>
									</div>
								</div>
							</div>
						</TaskDialog>
					))}
				</>
			) : null}
		</>
	);
};

export default TaskItem;
