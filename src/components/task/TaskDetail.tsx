"use client";
import { priorities, Status, statuses } from "@/constants";
import { useAssignment, useCreateAssignment } from "@/hooks/useAssignment";
import { useTask } from "@/hooks/useTask";
import { useState } from "react";
import { Combobox } from "../combobox";
import { Button } from "../ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const TaskDetail = ({
	status,
	id,
	priority,
	assigned_users,
	projectId,
	onSuccess,
}: {
	status?: "todo" | "done" | "doing";
	priority: "low" | "medium" | "high" | "urgent";
	id: string;
	assigned_users: any;
	projectId: string;
	onSuccess?: () => void;
}) => {
	console.log(" projectId~TaskDetail", projectId);
	const [statusOpen, setStatusOpen] = useState(false);
	const [priorityOpen, setPriorityOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	const [selectedPriority, setSelectedPriority] = useState<Status | null>(
		null,
	);

	const { updateTaskItem } = useTask({
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const { userInProject } = useAssignment({ id: projectId });
	const { createAssign } = useCreateAssignment();
	console.log(" userInProject~", userInProject);

	const handleSelectStatus = () => {
		console.log("s");
	};

	return (
		<div className=' mt-5'>
			<div className='flex flex-col gap-y-3 '>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Status
					</div>
					<Popover open={statusOpen} onOpenChange={setStatusOpen}>
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
						Priority
					</div>
					<Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className='w-[150px] justify-start'
							>
								{selectedPriority ? (
									<>{selectedPriority.label}</>
								) : (
									<>
										{priority === "low"
											? "Low"
											: priority === "medium"
											? "Medium"
											: priority === "high"
											? "High"
											: "Urgent"}
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
										{priorities.map((status) => (
											<CommandItem
												key={status.value}
												value={status.value}
												onSelect={(value) => {
													const selected =
														priorities.find(
															(s) =>
																s.value ===
																value,
														) || null;
													setSelectedPriority(
														selected,
													);
													if (selected) {
														updateTaskItem({
															id,
															priority:
																selected.value,
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
					<div className='text-sm text-black font-medium flex-1'>
						<div></div>
						{assigned_users?.length > 0 ? (
							<div className='flex items-center gap-2'>
								<div className='flex items-center flex-wrap gap-1'>
									{assigned_users.map((user: any) => (
										<div className='px-2 py-1 rounded-md border border-neutral-200 bg-gray-400 text-white text-xs font-medium'>
											{user.username}
										</div>
									))}
								</div>
							</div>
						) : (
							<div className='flex items-center gap-2'>
								<div className='text-sm text-black font-medium '>
									No one assigned
								</div>
								<div className='flex flex-col gap-1'>
									<div className='flex items-center gap-2'>
										<>
											{userInProject?.members?.map(
												(user: any) => (
													<Combobox
														items={userInProject.members.map(
															(user: any) => ({
																value: user.id,
																label: user.username,
															}),
														)}
														onSelect={() => {
															createAssign({
																user_id:
																	user.id,
																task_id: id,
															});
														}}
													/>
												),
											)}
										</>
									</div>
								</div>
							</div>
						)}
					</div>
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
};

export default TaskDetail;
