"use client";

import { registerUser } from "@/actions/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignUp() {
	const searchParams = useSearchParams();
	const errorMessage = searchParams.get("errorMessage");

	return (
		<div className="h-screen bg-gray-100 flex justify-center items-center">
			<div className="w-full max-w-xl rounded-xl shadow-lg p-10 border border-gray-100 bg-white">
				<h1 className="text-4xl font-medium text-center mb-7">SignUp</h1>

				{/* Error Message */}
				{errorMessage && (
					<div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 ">
						<span className="text-red-500 font-500">{errorMessage}</span>
					</div>
				)}

				{/* Form */}
				<form className="grid gap-6" action={registerUser}>
					<div className="grid gap-2">
						<Label required className="font-semibold">
							Name
						</Label>
						<Input type="text" placeholder="Enter Name" name="name" required />
					</div>
					<div className="grid gap-2">
						<Label required className="font-semibold">
							Email
						</Label>
						<Input
							type="email"
							placeholder="Enter Email"
							name="email"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label required className="font-semibold">
							Password
						</Label>
						<Input
							type="password"
							minLength={8}
							placeholder="Enter Password"
							name="password"
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Submit
					</Button>
					<div className="text-center">
						<span className="text-base font-medium">
							Already have an account?
						</span>
						<Link
							href="/login"
							className="text-blue-600 font-semibold mx-1 hover:underline"
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
