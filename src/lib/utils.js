import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

// 5️⃣ Receives JS Object and returns URL query. If JS Object empty, returns empty URL query.
export function objectToQueryString(obj) {
	const params = []
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null && value !== undefined && value !== "") {
			params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		}
	}
	return params.join("&")
}