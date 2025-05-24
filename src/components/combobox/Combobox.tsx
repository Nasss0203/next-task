"use client";

import { Check, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='none'
					role='combobox'
					aria-expanded={open}
					className=''
				>
					{value ? (
						items.find((item) => item.value === value)?.label
					) : (
						<Plus size={14} className='cursor-pointer' />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search member...' />
					<CommandList>
						<CommandEmpty>No member found.</CommandEmpty>
						<CommandGroup>
							{items?.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue,
										);
										setOpen(false);
										onSelect(currentValue);
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
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default Combobox;
