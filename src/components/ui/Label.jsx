import { cn } from "@/lib/utils";

export default function Label({ className, required, children, htmlFor }) {
	return (
		<div className={cn("text-sm lg:text-base h-fit", className)}>
			<label htmlFor={htmlFor}>{children}</label>
			{required && <span className="text-red-500">*</span>}
		</div>
	);
}
