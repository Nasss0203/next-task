export const status = [
	{
		title: "To do",
		value: "todo",
	},
	{
		title: "In Progress",
		value: "doing",
	},
	{
		title: "Done",
		value: "done",
	},
];
export const statusProject = [
	{
		title: "To do",
		value: "todo",
	},
	{
		title: "In Progress",
		value: "active",
	},
	{
		title: "Done",
		value: "done",
	},
];

export const priority = [
	{
		title: "Low",
		value: "low",
	},
	{
		title: "Medium",
		value: "medium",
	},
	{
		title: "High",
		value: "high",
	},
];

export const QueryKeys = {
	TASK: "tasks",
	PROJECT: "projects",
	USER: "users",
};

export type Status = {
	value: string;
	label: string;
};

export const statuses: Status[] = [
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

export const priorities: Status[] = [
	{
		value: "low",
		label: "Low",
	},
	{
		value: "medium",
		label: "Medium",
	},
	{
		value: "high",
		label: "High",
	},
	{
		value: "urgent",
		label: "Urgent",
	},
];
