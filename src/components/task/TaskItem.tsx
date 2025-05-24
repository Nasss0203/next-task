"use client";
import { fetchAllTask } from "@/api/task.api";
import { QueryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import TaskDialog from "./TaskDialog";

const TaskItem = ({ status }: { status?: "todo" | "done" | "doing" }) => {
	const { data } = useQuery({
		queryKey: [QueryKeys.TASK, status],
		queryFn: () => fetchAllTask({ query: { status } }),
	});
	console.log(`data-TaskItem-${status}`, data);

	return (
		<>
			{data && data?.length > 0 ? (
				<>
					{data.map((item: any) => (
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
										<span className='bg-gray-200 px-2 py-0.5 rounded'>
											Label
										</span>
										<span className='bg-gray-200 px-2 py-0.5 rounded'>
											Label
										</span>
									</div>
									<hr />
									<div className='flex justify-between items-center text-sm text-gray-500'>
										<div className='flex -space-x-2'>
											<img
												className='w-6 h-6 rounded-full border-2 border-white'
												src='https://via.placeholder.com/24'
											/>
											<img
												className='w-6 h-6 rounded-full border-2 border-white'
												src='https://via.placeholder.com/24'
											/>
											<img
												className='w-6 h-6 rounded-full border-2 border-white'
												src='https://via.placeholder.com/24'
											/>
										</div>
										<div className='flex items-center gap-2'>
											<span>📎 3</span>
											<span>💬 1</span>
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
