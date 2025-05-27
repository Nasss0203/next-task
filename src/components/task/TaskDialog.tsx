'use client";';
import { useTask } from "@/hooks/useTask";
import { useUser } from "@/hooks/useUser";
import { Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import TaskDetail from "./TaskDetail";

// PRIORITY_CHOICES = [
// 	('low', 'Low'),
// 	('medium', 'Medium'),
// 	('high', 'High'),
// 	('urgent', 'Urgent'),
// ]

const TaskDialog = ({
	id,
	children,
	title,
	status,
	priority,
	assigned_users,
	projectId,
}: {
	id: string;
	children: ReactNode;
	assigned_users?: any;
	projectId: string;
	title: string;
	status: "todo" | "done" | "doing";
	priority: "low" | "medium" | "high" | "urgent";
}) => {
	console.log(" status~", status);
	const { user } = useUser();
	const [open, setOpen] = useState(false);
	const { deleteTaskItem } = useTask();
	return (
		<div className='relative group'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className='cursor-pointer w-full'>
					{children}
				</DialogTrigger>
				<DialogContent className='min-w-[600px]'>
					<DialogHeader>
						<DialogTitle className='text-2xl font-semibold line-clamp-2 '>
							{title}
						</DialogTitle>
						<DialogDescription>
							<TaskDetail
								projectId={projectId}
								priority={priority}
								status={status}
								assigned_users={assigned_users}
								id={id}
								onSuccess={() => setOpen(false)}
							/>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			{user?.role === "admin" || user?.role === "manager" ? (
				<div className=' absolute top-0 right-0 px-2 py-1 cursor-pointer'>
					<Popover>
						<PopoverTrigger>
							<BsThreeDots />
						</PopoverTrigger>
						<PopoverContent className='w-[100px] p-1 cursor-pointer'>
							<AlertDialog>
								<AlertDialogTrigger className='cursor-pointer flex items-center gap-1 text-xs'>
									<Trash2 className='size-4' />
									<span>Delete</span>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This will permanently delete the
											task.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												deleteTaskItem(id);
											}}
										>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</PopoverContent>
					</Popover>
				</div>
			) : null}
		</div>
	);
};

export default TaskDialog;
