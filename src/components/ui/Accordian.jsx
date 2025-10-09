import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "../Icons";

export default function Accordian({
	title,
	isOpened,
	type,
	children,
	handleAccordian,
}) {
	return (
		<div className="space-y-2 border-b border-b-gray-300 pb-3">
			<div
				className="accordian-button"
				onClick={() => handleAccordian(type)}
				// 2️⃣ Send "category" as argument for handleAccordian()
			>
				<span>{title}</span>
				<ChevronDownIcon
					className={cn(
						"transition-all duration-300 ease-in-out",
						isOpened && "rotate-180"
					)}
				/>
			</div>
			<div
				className={cn(
					"max-h-0 overflow-hidden max-height duration-300 ease-in-out",
					isOpened && "max-h-96"
				)}
			>
				{children}
			</div>
		</div>
	);
}
