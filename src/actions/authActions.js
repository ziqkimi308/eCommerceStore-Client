"use server"

import { getCookie, setCookie } from "@/lib/cookies"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Constant Variable
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Signup
export async function registerUser(formData) {
	// Prepare form data
	const data = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password")
	}

	// Fetch data from Admin site
	const response = await fetch(`${BASE_URL}/api/auth/signup`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}
	)
	// Handle fetching error
	if (!response.ok) {
		const errorResponse = await response.json()
		return redirect(`/sign-up?errorMessage=${errorResponse.message || "Something went wrong. Please try again."}`)
	}

	const resData = await response.json()
	await setCookie("customer_jwt_token", resData.token, { maxAge: 2 * 60 * 60 })
	redirect("/")
}

// Login
export async function loginUser(formData) {
	// Prepare form data
	const data = {
		email: formData.get("email"),
		password: formData.get("password")
	}

	// Fetch data
	const response = await fetch(`${BASE_URL}/api/auth/login`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		}
	)
	// Handle fetching error
	if (!response.ok) {
		const errRes = await response.json()
		return redirect(`/login?errorMessage=${errRes.message || "Something Went Wrong. Please try again."}`)
	}

	const resData = await response.json()
	await setCookie("customer_jwt_token", resData.token, { maxAge: 2 * 60 * 60 })
	redirect("/")
}

// Delete cookie
export async function deleteCookie(name) {
	const cookieStore = await cookies()
	cookieStore.delete(name)
}

// Fetch customer data
export async function getCustomerData() {
	// Fetch data
	const res = await fetch(`${BASE_URL}/api/customer`,
		{
			credentials: "include",
			headers: {
				Cookie: (await cookies()).toString()
			}
		}
	)
	// If failed
	if (!res.ok) {
		await deleteCookie("customer_jwt_token")
	}

	const data = await res.json()
	return data
}

// Logout
export async function logoutUser() {
	await deleteCookie("customer_jwt_token")
	
}