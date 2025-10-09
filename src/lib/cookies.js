import { cookies } from "next/headers";

// Create cookies
// options with default value of empty object
export async function setCookie(name, value, options = {}) {
	const cookieOptions = {
		httpOnly: true, // cookie is off-limits to JavaScript running in the browser
		secure: process.env.NODE_ENV === "production", // secure only when in production mode, currently in development mode
		sameSite: "strict", // cookies only be send when user in the website
		path: "/",
		...options
	}
	const cookieStore = await cookies()
	cookieStore.set(name, value, cookieOptions)
}

// Retrieve cookies
export async function getCookie(name) {
	const cookieStore = await cookies()
	const cookie = cookieStore.get(name)
	return cookie?.value || null
}