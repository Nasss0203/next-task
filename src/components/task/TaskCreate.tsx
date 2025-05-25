"use client";
import { createTask } from "@/api/task.api";
import { priority, QueryKeys, status } from "@/constants";
import { useFetchAllProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { TaskSchema, TaskSchemaType } from "@/validator/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ReactNode } from "react";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const TaskCreate = ({
	children,
	projectId,
	nameProject,
}: {
	children: ReactNode;
	projectId?: string;
	nameProject?: string;
}) => {
	const queryClient = useQueryClient();
	const { user } = useUser();
	const { dataProject } = useFetchAllProject({ status: "" });

	const form = useForm<TaskSchemaType>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			userId: user?.id || "",
			description: "",
			title: "",
			status: "todo",
			priority: "high",
			due_date: new Date(),
			projectId: projectId as any | null,
		},
	});

	const mutation = useMutation({
		mutationFn: (values: any) => createTask(values),
		onSuccess: (data: any) => {
			toast.success("create task successfully");
			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
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
			<AlertDialogTrigger className=''>
				<span className=''>{children}</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<ScrollArea className='lg:h-[85vh] 2xl:h-auto w-full'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8 w-full p-5'
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
									<div className='flex items-center gap-5 w-full'>
										<FormField
											control={form.control}
											name='priority'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>
														Priority
													</FormLabel>
													<Select
														value={field.value}
														onValueChange={
															field.onChange
														}
													>
														<FormControl>
															<SelectTrigger className='w-full'>
																<SelectValue placeholder='Select Priority' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{priority.map(
																(item) => (
																	<SelectItem
																		key={
																			item.value
																		}
																		value={
																			item.value
																		}
																	>
																		{
																			item.title
																		}
																	</SelectItem>
																),
															)}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='status'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>
														Status
													</FormLabel>
													<Select
														value={field.value}
														onValueChange={
															field.onChange
														}
													>
														<FormControl>
															<SelectTrigger className='w-full'>
																<SelectValue placeholder='To do' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{status.map(
																(item) => (
																	<SelectItem
																		key={
																			item.value
																		}
																		value={
																			item.value
																		}
																	>
																		{
																			item.title
																		}
																	</SelectItem>
																),
															)}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									</div>
									<>
										{projectId ? (
											// Nếu projectId đã được truyền vào
											<FormField
												control={form.control}
												name='projectId'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Project
														</FormLabel>
														<FormControl>
															<Input
																value={
																	nameProject ??
																	""
																}
																readOnly
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										) : (
											// Nếu projectId không được truyền vào
											<FormField
												control={form.control}
												name='projectId'
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Project
														</FormLabel>
														<FormControl>
															<Select
																value={
																	field.value ||
																	""
																} // Đảm bảo giá trị không bị undefined
																onValueChange={(
																	value,
																) =>
																	field.onChange(
																		value,
																	)
																} // Lưu giá trị id vào form
															>
																<SelectTrigger className='w-full'>
																	<SelectValue placeholder='Select a project' />
																</SelectTrigger>
																<SelectContent>
																	{dataProject &&
																		dataProject.length >
																			0 &&
																		dataProject.map(
																			(
																				item: any,
																			) => (
																				<SelectItem
																					key={
																						item.id
																					}
																					value={
																						item.id
																					} // Giá trị id của project
																				>
																					{
																						item.name
																					}
																				</SelectItem>
																			),
																		)}
																</SelectContent>
															</Select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										)}
									</>
									<FormField
										control={form.control}
										name='description'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														className=''
														placeholder='Description'
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='due_date'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date</FormLabel>
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
														<FormControl>
															<Button
																variant='outline'
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
													</DropdownMenuTrigger>
													<DropdownMenuContent className='w-auto p-0'>
														<Calendar
															mode='single'
															selected={
																field.value
															}
															onSelect={
																field.onChange
															}
															initialFocus
														/>
													</DropdownMenuContent>
												</DropdownMenu>
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
				</ScrollArea>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default TaskCreate;
