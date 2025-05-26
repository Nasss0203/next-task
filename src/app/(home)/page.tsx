"use client";
import {
	columns,
	memberColumnsTaskUser,
	memberColumnsUser,
} from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useUserByAssignmentTask } from "@/hooks/useAssignment";
import {
	useFetchUserInProject,
	useMyProjects,
	useProgressProject,
} from "@/hooks/useProject";
import { useGetAllTasksForProject } from "@/hooks/useTask";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { MdDoNotDisturbOn } from "react-icons/md";

export default function Home() {
	const [projectId, setProjectId] = useState<string | undefined>(undefined);
	const [taskId, setTaskId] = useState<string | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [openTask, setOpenTask] = useState(false);

	const { data: project = [] } = useMyProjects();

	const { data } = useProgressProject({
		id: projectId,
	});

	const { data: taskForProject = [] } = useGetAllTasksForProject({
		id: projectId,
		query: {},
	});

	const { dataUser = [] } = useFetchUserInProject({ id: projectId });

	const { data: taskUser = [] } = useUserByAssignmentTask({ id: taskId });
	const dataTaskUser = taskUser?.assigned_users || [];

	useEffect(() => {
		if (project.length > 0 && !projectId) {
			setProjectId(project[0].id);
		}
	}, [project, projectId]);

	useEffect(() => {
		if (
			Array.isArray(taskForProject) &&
			taskForProject.length > 0 &&
			!taskId
		) {
			setTaskId(taskForProject[0].id);
		}
	}, [taskForProject, taskId]);
	return (
		<div className='flex flex-col gap-5'>
			<div className='bg-white shadow-xl p-5 rounded-xl flex flex-col gap-5'>
				<div className='flex items-center space-x-4'>
					<p className='text-sm text-muted-foreground uppercase font-semibold'>
						Project
					</p>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-[150px] justify-start'
							>
								{projectId
									? project.find(
											(p: any) => p.id === projectId,
									  )?.name || "Select Project"
									: "Select Project"}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className='p-0'
							side='right'
							align='start'
						>
							<Command>
								<CommandList>
									<CommandEmpty>
										No results found.
									</CommandEmpty>
									<CommandGroup>
										<div className='px-4 py-2 text-sm font-semibold text-muted-foreground'>
											Projects
										</div>
										{project?.length > 0 &&
											project?.map((proj: any) => (
												<CommandItem
													key={proj.id}
													value={proj.id}
													onSelect={() => {
														setProjectId(proj.id);
														setOpen(false);
													}}
												>
													<div className='flex flex-col'>
														<span className='font-medium'>
															{proj.name}
														</span>
													</div>
												</CommandItem>
											))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<div className='grid grid-cols-4 gap-5'>
					{[
						{
							label: "Total Task",
							icon: <GrTasks />,
							value: data?.total_tasks,
							percent: data?.progress_percent,
						},
						{
							label: "Not started",
							icon: <MdDoNotDisturbOn />,
							value: data?.todo?.count,
							percent: data?.todo?.percent,
						},
						{
							label: "Active",
							icon: <FaCircleDot />,
							value: data?.doing?.count,
							percent: data?.doing?.percent,
						},
						{
							label: "Done",
							icon: <FaCheckCircle />,
							value: data?.done?.count,
							percent: data?.done?.percent,
						},
					].map(({ label, icon, value, percent }, idx) => (
						<div
							key={idx}
							className='p-3 rounded-xl border border-neutral-300 flex flex-col gap-2'
						>
							<div className='flex items-center justify-between'>
								<div className='text-base font-medium text-black'>
									{label}
								</div>
								<div className='text-xl'>{icon}</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-2xl font-bold'>
									{value ?? "-"}
								</div>
								<div className='flex items-center gap-1'>
									<span className='text-xs font-medium'>
										Progress:
									</span>
									<span className='font-medium'>
										{percent ?? 0}%
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='container w-full bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5'>
				<div className='text-base font-medium text-black'>Tasks</div>
				<DataTable columns={columns} data={taskForProject} />
			</div>

			<div className='grid-cols-2 gap-5 grid'>
				<div className='container w-full bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5'>
					<div className='text-base font-medium text-black'>
						Members
					</div>
					<div className=''>
						{projectId ? (
							<DataTable
								columns={memberColumnsUser(projectId)}
								data={dataUser}
							/>
						) : (
							<div className='text-sm text-gray-500'>
								Please select a project to view members.
							</div>
						)}
					</div>
				</div>
				<div className='container w-full bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5'>
					<div className='flex items-center justify-between'>
						<div className='text-base font-medium text-black'>
							Assignments
						</div>
						<Popover open={openTask} onOpenChange={setOpenTask}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									className='w-[150px] justify-start'
								>
									{taskId
										? taskForProject.find(
												(task: any) =>
													task.id === taskId,
										  )?.title || "Select Task"
										: "Select Task"}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className='p-0'
								side='right'
								align='start'
							>
								<Command>
									<CommandList>
										<CommandEmpty>
											No tasks found.
										</CommandEmpty>
										<CommandGroup>
											<div className='px-4 py-2 text-sm font-semibold text-muted-foreground'>
												Tasks
											</div>
											{taskForProject?.length > 0 &&
												taskForProject.map(
													(task: any) => (
														<CommandItem
															key={task.id}
															value={task.id}
															onSelect={() => {
																setTaskId(
																	task.id,
																);
																setOpenTask(
																	false,
																);
															}}
														>
															<div className='flex flex-col'>
																<span className='font-medium'>
																	{task.title}
																</span>
															</div>
														</CommandItem>
													),
												)}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
					<div className=''>
						{taskId ? (
							<DataTable
								columns={memberColumnsTaskUser(taskId)}
								data={dataTaskUser}
							/>
						) : (
							<div className='text-sm text-gray-500'>
								Please select a task to view assignments.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
