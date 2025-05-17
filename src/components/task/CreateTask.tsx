"use client";
import { createTask } from "@/api/task.api";
import { priority, status } from "@/constants";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { TaskSchema, TaskSchemaType } from "@/validator/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
const CreateTask = () => {
	const queryClient = useQueryClient();
	const { user } = useUser();

	const form = useForm<TaskSchemaType>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			userId: user?.id || "",
			description: "",
			title: "",
			status: "todo",
			priority: "high",
			due_date: new Date(),
			project: null,
		},
	});

	const mutation = useMutation({
		mutationFn: (values: any) => createTask(values),
		onSuccess: (data: any) => {
			toast.success("create task successfully");
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			form.reset();
		},
		onError: (error) => {
			console.error("Đăng ký thất bại:", error);
			toast.error("Create task fail");
		},
	});

	function onSubmit(values: TaskSchemaType) {
		const formattedValues = {
			...values,
			due_date: format(values.due_date, "yyyy-MM-dd"),
		};

		mutation.mutate(formattedValues);
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger className='flex items-center gap-1 border border-neutral-500 p-2 rounded-md'>
				<PlusIcon className='size-5' />
				<span className='text-base'>Create Task</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<AlertDialogHeader>
							<AlertDialogTitle className='mb-5'>
								Create Task
							</AlertDialogTitle>
							<AlertDialogDescription className='space-y-5'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder='shadcn'
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='priority'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Priority</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select Priority' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{priority.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
														>
															{item.title}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='status'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='To do' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{status.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
														>
															{item.title}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='project'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Project</FormLabel>
											<FormControl>
												<Select>
													<SelectTrigger className='w-full'>
														<SelectValue placeholder='Theme' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='light'>
															Light
														</SelectItem>
														<SelectItem value='dark'>
															Dark
														</SelectItem>
														<SelectItem value='system'>
															System
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													className=''
													placeholder='Description'
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='due_date'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"justify-start text-left font-normal",
																!field.value &&
																	"text-muted-foreground",
															)}
														>
															<CalendarIcon className='mr-2 h-4 w-4' />
															{field.value
																? format(
																		field.value,
																		"PPP",
																  )
																: "Pick a date"}
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={
															field.onChange
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<Button type='submit'>Continue</Button>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreateTask;
