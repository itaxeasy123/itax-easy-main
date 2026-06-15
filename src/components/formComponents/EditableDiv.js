"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function EditableInput({value,className,wrapperClassName,...props}) {
	const [isEditable, setIsEditable] = useState(false);
	const [inputValue, setInputValue] = useState(value);
    const classes =`w-full px-2 pr-7  outline outline-2 focus:outline-blue-600 ${className} ${isEditable ? " outline-blue-500 " : " outline-none"}`
	return (
		<div className={`${wrapperClassName} relative flex gap-1 flex-nowrap items-center`}>
			<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={classes} disabled={!isEditable} {...props} />
			<button className="absolute right-1" onClick={() => setIsEditable(!isEditable)} type="button">
				<Icon className={` ${isEditable?"text-blue-600":" text-neutral-700"}`} icon={isEditable ? "mingcute:edit-line" : "mingcute:edit-line"} />
			</button>
		</div>
	);
}
