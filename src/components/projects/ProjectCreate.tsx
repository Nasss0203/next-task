"use client";
import { priority, statusProject } from "@/constants";
import { useCreateProject } from "@/hooks/useProject";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
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
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const ProjectCreate = () => {
	const { form, onSubmit } = useCreateProject();
	return (
		<AlertDialog>
			<AlertDialogTrigger className='flex items-center cursor-pointer border border-neutral-500 p-2 rounded-md'>
				<PlusIcon className='size-5' />
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
									Create Project
								</AlertDialogTitle>
								<AlertDialogDescription className='space-y-5'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name </FormLabel>
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
									<div className='flex items-center gap-5'>
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
																		className='w-full'
																	>
																		{
																			item.title
																		}
																	</SelectItem>
																),
															)}
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
															{statusProject?.map(
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
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

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

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='start_date'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Start Date
												</FormLabel>
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

									<FormField
										control={form.control}
										name='end_date'
										render={({ field }) => (
											<FormItem>
												<FormLabel>End Date</FormLabel>
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
									<FormField
										control={form.control}
										name='is_personal'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Is Personal
												</FormLabel>
												<FormControl>
													<RadioGroup
														value={field.value?.toString()} // Chuyển boolean thành string
														onValueChange={(
															value,
														) =>
															field.onChange(
																value ===
																	"true",
															)
														} // Chuyển string thành boolean
													>
														<div className='flex items-center space-x-4'>
															<div className='flex items-center space-x-2'>
																<RadioGroupItem
																	value='true'
																	id='is_personal_yes'
																/>
																<Label htmlFor='is_personal_yes'>
																	Yes
																</Label>
															</div>
															<div className='flex items-center space-x-2'>
																<RadioGroupItem
																	value='false'
																	id='is_personal_no'
																/>
																<Label htmlFor='is_personal_no'>
																	No
																</Label>
															</div>
														</div>
													</RadioGroup>
												</FormControl>
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

export default ProjectCreate;
