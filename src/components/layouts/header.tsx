"use client";
import { BadgeCheck, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
	const [auth, setAuth] = useState(false);
	return (
		<div className='px-5 py-4 bg-white flex items-center'>
			<div className='font-bold text-xl text-black mr-20'>
				Task Management
			</div>
			<div className='flex items-center justify-between flex-1'>
				<div></div>
				<div>
					{auth ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer'>
									<Avatar className='w-8 h-8 rounded-lg'>
										<AvatarImage src={""} alt={""} />
										<AvatarFallback className='rounded-full'>
											CN
										</AvatarFallback>
									</Avatar>
									<span className='font-semibold truncate text-sm leading-tight text-left  hidden md:block'></span>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
								side={"bottom"}
								align='end'
								sideOffset={4}
							>
								<DropdownMenuLabel className='p-0 font-normal'>
									<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
										<Avatar className='w-8 h-8 rounded-lg'>
											<AvatarImage src={""} alt={""} />
											<AvatarFallback className='rounded-lg'>
												CN
											</AvatarFallback>
										</Avatar>
										<span className='font-semibold truncate text-sm leading-tight text-left'>
											{/* {user.username} */}
										</span>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<Link href={"/"} className=''>
										<DropdownMenuItem>
											<BadgeCheck />
											Account
										</DropdownMenuItem>
									</Link>

									<Link href={"/"} className=''>
										<DropdownMenuItem>
											<Settings />
											Settings
										</DropdownMenuItem>
									</Link>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className='flex items-center gap-2 text-sm font-medium'>
							<Link
								href={"/sign-in"}
								className='hover:text-[#475BE8]'
							>
								Sign in
							</Link>
							<span>/</span>
							<Link
								href={"/sign-up"}
								className='hover:text-[#475BE8]'
							>
								Sign up
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
