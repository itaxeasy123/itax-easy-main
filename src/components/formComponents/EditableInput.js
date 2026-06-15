"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function EditableInput({className,wrapperClassName,...props}) {
	const [isEditable, setIsEditable] = useState(false);
    const classes =`w-full py-1 px-2 pr-7 rounded  outline outline-2 focus:outline-blue-600 ${className} ${isEditable ? " outline-blue-500 " : " outline-neutral-200"}`
	return (
		<div className={`${wrapperClassName} relative flex gap-1 flex-nowrap items-center`}>
			<input className={classes} disabled={!isEditable} {...props} />
			<button className="absolute right-1" onClick={() => setIsEditable(!isEditable)} type="button">
				<Icon className={`text-xl ${isEditable?"text-blue-600":" text-neutral-700"}`} icon={isEditable ? "mingcute:edit-line" : "mingcute:edit-line"} />
			</button>
		</div>
	);
}
