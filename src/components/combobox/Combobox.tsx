"use client";

import { Check, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Combobox = ({
	items,
	onSelect,
}: {
	items: { value: string; label: string }[];
	onSelect: (value: string) => void;
}) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='none'
					role='combobox'
					aria-expanded={!!value}
					className=''
				>
					<Plus size={14} className='cursor-pointer' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[200px]'>
				<DropdownMenuLabel>Search member</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{items?.map((item) => (
					<DropdownMenuItem
						key={item.value}
						onClick={() => {
							setValue(item.value === value ? "" : item.value);
							onSelect(item.value);
						}}
					>
						<Check
							className={cn(
								"mr-2 h-4 w-4",
								value === item.value
									? "opacity-100"
									: "opacity-0",
							)}
						/>
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Combobox;
