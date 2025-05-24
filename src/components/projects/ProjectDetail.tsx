import {
	useProject,
	useProjectDetail,
	useProjectUpdate,
} from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Combobox } from "../combobox";
import { TaskCreate } from "../task";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Status = {
	value: string;
	label: string;
};

const statuses = [
	{ value: "todo", label: "Todo" },
	{ value: "active", label: "In Progress" },
	{ value: "done", label: "Done" },
];

const priorities = [
	{ value: "low", label: "Low" },
	{ value: "medium", label: "Medium" },
	{ value: "high", label: "High" },
];

const ProjectDetail = ({
	id,
	end_date,
	tasks,
	start_date,
	members,
	priority,
	status,
	name,
}: {
	id: string;
	status?: string;
	start_date?: Date;
	tasks?: [];
	priority?: string;
	members?: any;
	end_date?: Date;
	name?: string;
}) => {
	const {
		statusPopoverOpen,
		setStatusPopoverOpen,
		selectedStatus,
		handleSelectStatus,
		priorityPopoverOpen,
		setPriorityPopoverOpen,
		selectedPriority,
		handleSelectPriority,
	} = useProjectDetail(status, priority);

	const { updateItem } = useProjectUpdate();
	const { addMember } = useProject();

	const { fetchUser } = useUser();
	console.log(" fetchUser~", fetchUser);

	const users = fetchUser?.map((user: any) => ({
		value: user.id,
		label: user.username,
	}));

	const handleAddMember = (userId: string) => {
		addMember({
			id,
			user_id: userId,
		});
	};

	console.log("member", members);

	return (
		<div className='mt-5'>
			<div className='flex flex-col gap-y-3 '>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-600 w-20'>
						Status
					</div>
					<Popover
						open={statusPopoverOpen}
						onOpenChange={setStatusPopoverOpen}
					>
						<PopoverTrigger asChild>
							<Button
								variant={"none"}
								className={`w-[200px] justify-start   ${
									selectedStatus === "todo"
										? "bg-[#B0BEC5] text-[#263238]  "
										: selectedStatus === "active"
										? "bg-[#BBDEFB] text-[#1565C0]  "
										: "bg-[#C8E6C9] text-[#2E7D32]  "
								}`}
							>
								{selectedStatus === "todo"
									? "Not Started"
									: selectedStatus === "active"
									? "In Progress"
									: "Completed"}
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
										{statuses.map((s) => (
											<CommandItem
												key={s.value}
												value={s.value}
												onSelect={(value) => {
													updateItem({
														id,
														status: value,
													});
													handleSelectStatus(value);
												}}
											>
												{s.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>

				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-600 w-20'>
						Priority
					</div>
					<Popover
						open={priorityPopoverOpen}
						onOpenChange={setPriorityPopoverOpen}
					>
						<PopoverTrigger asChild>
							<Button
								variant={"none"}
								className={`w-[200px] justify-start   ${
									selectedPriority === "low"
										? "bg-[#E0F7FA] text-[#00796B] "
										: selectedPriority === "medium"
										? "bg-[#FFF9C4] text-[#F57F17] "
										: "bg-[#FFCDD2] text-[#C62828] "
								}`}
							>
								{selectedPriority === "low"
									? "Low"
									: selectedPriority === "medium"
									? "Medium"
									: "High"}
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
										{priorities.map((p) => (
											<CommandItem
												key={p.value}
												value={p.value}
												onSelect={(value) => {
													console.log(
														" value~",
														value,
													);
													updateItem({
														id,
														priority: value,
													});
													handleSelectPriority(value);
												}}
											>
												{p.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-600 w-20'>
						Timeline
					</div>
					<DatePicker
						from={start_date}
						to={end_date}
						onChange={(range) => {
							let start = null;
							let end = null;

							if (range?.from) {
								const fromDate =
									typeof range.from === "string"
										? new Date(range.from)
										: range.from;
								start =
									fromDate instanceof Date &&
									!isNaN(fromDate.getTime())
										? format(fromDate, "yyyy-MM-dd")
										: typeof range.from === "string"
										? range.from
										: null;
							}

							if (range?.to) {
								const toDate =
									typeof range.to === "string"
										? new Date(range.to)
										: range.to;
								end =
									toDate instanceof Date &&
									!isNaN(toDate.getTime())
										? format(toDate, "yyyy-MM-dd")
										: typeof range.to === "string"
										? range.to
										: null;
							}

							updateItem({
								id,
								start_date: start,
								end_date: end,
							});
						}}
					/>
				</div>

				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-600 w-20'>
						Tasks
					</div>
					<div className='flex items-center gap-2'>
						<div className='px-2 py-1 rounded-md border border-neutral-200 bg-gray-400 text-white text-xs font-medium'>
							{tasks?.length ? tasks.length : 0} tasks
						</div>
						<TaskCreate projectId={id} nameProject={name}>
							<Plus size={14} className='cursor-pointer' />
						</TaskCreate>
					</div>
				</div>
				{/* Members */}
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-600 w-20'>
						Members
					</div>
					<div className='flex items-center gap-1'>
						<span className='px-2 py-1 rounded-md border border-neutral-200 bg-gray-400 cursor-pointer text-white text-xs font-medium'>
							{members?.length ? members.length : 0} members
						</span>
						<Combobox
							items={users || []}
							onSelect={handleAddMember}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;

function DatePicker({
	from,
	to,
	onChange, // thêm prop này
}: {
	from?: Date;
	to?: Date;
	onChange?: (range: DateRange | undefined) => void;
}) {
	const [date, setDate] = useState<DateRange | undefined>(
		from && to ? { from, to } : undefined,
	);

	useEffect(() => {
		if (from && to) setDate({ from, to });
	}, [from, to]);

	const handleSelect = (range: DateRange | undefined) => {
		if (range && typeof range === "object" && "from" in range) {
			setDate(range);
			if (onChange) onChange(range);
		}
	};
	return (
		<div className={cn("grid gap-2")}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={"outline"}
						className={cn(
							"w-[300px] justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleSelect} // dùng hàm mới
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
