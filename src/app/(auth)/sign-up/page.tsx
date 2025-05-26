"use client";

import { register } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUp = () => {
	const router = useRouter();
	const formSchema = z.object({
		username: z.string().min(2).max(50),
		email: z.string().email(),
		password: z.string().min(8),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const mutation = useMutation({
		mutationFn: (values: any) => register(values),
		onSuccess: (data: any) => {
			router.push("/");
		},
		onError: (error) => {
			console.error("Đăng ký thất bại:", error);
			toast.error("Register fail");
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("values: ", values);
		mutation.mutate(values);
	}
	return (
		<div className='flex flex-col gap-5'>
			<div className='uppercase font-bold text-center text-3xl'>
				Sign Up
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='shadcn' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='shadcn' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder='shadcn'
										{...field}
										type='password'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full uppercase'>
						Login
					</Button>
					<div className='flex items-center justify-center'>
						<div className='flex items-center gap-1 text-sm'>
							<p className='text-[#666]'>Already have account?</p>
							<Link
								href={"/sign-in"}
								className='font-medium text-[#1a1a1a]'
							>
								Login
							</Link>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SignUp;
