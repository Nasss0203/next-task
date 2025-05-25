"use client";
import { columns } from "@/components/table/columns";
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
import { useMyProjects, useProgressProject } from "@/hooks/useProject";
import { useGetAllTasksForProject } from "@/hooks/useTask";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { GrTasks } from "react-icons/gr";
import { MdDoNotDisturbOn } from "react-icons/md";

export default function Home() {
	const { data: project = [] } = useMyProjects();
	const [projectId, setProjectId] = useState<string | undefined>(undefined);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (project.length > 0 && !projectId) {
			setProjectId(project[0].id);
		}
	}, [project, projectId]);

	const { data } = useProgressProject({
		id: projectId,
	});

	const { data: taskForProject = [] } = useGetAllTasksForProject({
		id: projectId,
		query: {},
	});
	console.log(" taskForProject~", taskForProject);

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
										{project.map((proj: any) => (
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
			<div className='container w-full bg-white p-5 rounded-lg shadow-lg'>
				<div className='flex items-center justify-between mb-4'>
					<button className='text-blue-500 hover:underline'>
						<Plus />
					</button>
				</div>
				<DataTable columns={columns} data={taskForProject} />
			</div>
		</div>
	);
}
