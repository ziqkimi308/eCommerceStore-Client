import { cn } from "@/lib/utils";

// It receives "type" prop with default value "button" which can be override
export default function Button({
	type = "button",
	onClick,
	className,
	children,
	...props
}) {
	return (
		<button
			type={type}
			className={cn("custom-btn", className)}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}
