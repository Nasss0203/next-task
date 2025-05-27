import { useProjectDelete } from "@/hooks/useProject";
import { Trash2 } from "lucide-react";
import { ReactNode } from "react";
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
import ProjectDetail from "./ProjectDetail";

const ProjectDialog = ({
	children,
	name,
	status,
	end_date,
	start_date,
	members,
	priority,
	tasks,
	id,
}: {
	id: string;
	status?: string;
	start_date?: Date;
	tasks?: [];
	priority?: string;
	members?: number;
	end_date?: Date;
	name: string;
	children: ReactNode;
}) => {
	const { deleteItem } = useProjectDelete();
	return (
		<div className='relative group'>
			<Dialog>
				<DialogTrigger className='cursor-pointer w-full'>
					{children}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							<ProjectDetail
								id={id}
								end_date={end_date}
								start_date={start_date}
								members={members}
								priority={priority}
								status={status}
								tasks={tasks}
								name={name}
							></ProjectDetail>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
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
										Deleting this project is permanent and
										cannot be undone.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => {
											deleteItem({ id });
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
		</div>
	);
};

export default ProjectDialog;
