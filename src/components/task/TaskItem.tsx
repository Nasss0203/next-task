"use client";
import { fetchAllTask } from "@/api/task.api";
import { useTaskUpdate } from "@/hooks/useTask";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "../ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const TaskItem = ({ status }: { status?: "todo" | "done" | "doing" }) => {
	const { data } = useQuery({
		queryKey: ["tasks", status],
		queryFn: () => fetchAllTask({ query: { status } }),
	});
	console.log(`data-${status}`, data);

	return (
		<>
			{data && data?.length > 0 ? (
				<>
					{data.map((item: any) => (
						<DialogTask
							title={item.title}
							status={item.status}
							id={item.id}
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
						</DialogTask>
					))}
				</>
			) : null}
		</>
	);
};

export default TaskItem;

function DialogTask({
	id,
	children,
	title,
	status,
}: {
	id: string;
	children: ReactNode;
	title: string;
	status: "todo" | "done" | "doing";
}) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className='min-w-[600px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-semibold line-clamp-2'>
						{title}
					</DialogTitle>
					<DialogDescription>
						<TaskDetail
							status={status}
							id={id}
							onSuccess={() => setOpen(false)}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

type Status = {
	value: string;
	label: string;
};

function TaskDetail({
	status,
	id,
	onSuccess,
}: {
	status?: "todo" | "done" | "doing";
	id: string;
	onSuccess?: () => void;
}) {
	const statuses: Status[] = [
		{
			value: "todo",
			label: "Todo",
		},
		{
			value: "doing",
			label: "In Progress",
		},
		{
			value: "done",
			label: "Done",
		},
	];
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	const { updateTaskItem } = useTaskUpdate({
		onSuccess: () => {
			onSuccess?.();
		},
	});

	return (
		<div className=' mt-5'>
			<div className='flex flex-col gap-y-3 '>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Status
					</div>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-[150px] justify-start'
							>
								{selectedStatus ? (
									<>{selectedStatus.label}</>
								) : (
									<>
										{status === "todo"
											? "Todo"
											: status === "doing"
											? "In Progress"
											: "Done"}
									</>
								)}
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
										{statuses.map((status) => (
											<CommandItem
												key={status.value}
												value={status.value}
												onSelect={(value) => {
													const selected =
														statuses.find(
															(s) =>
																s.value ===
																value,
														) || null;
													setSelectedStatus(selected);
													setOpen(false);
													if (selected) {
														updateTaskItem({
															id,
															status: selected.value,
														});
													}
												}}
											>
												{status.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Assigned to
					</div>
					<div className='text-sm text-black font-medium '>Nass</div>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Due Date
					</div>
					<div className='text-sm text-black font-medium '>
						December 5, 2023
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Tags
					</div>
					<div className='text-sm text-black p-1 bg-purple-200 rounded-md font-medium '>
						Developer
					</div>
				</div>
			</div>
		</div>
	);
}
