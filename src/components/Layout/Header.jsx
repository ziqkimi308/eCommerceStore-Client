"use client";

import { useState, useRef, useEffect } from "react";
import { SearchIcon, CartIcon, UserIcon } from "../Icons";
import Link from "next/link";
import Input from "../ui/Input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { objectToQueryString } from "@/lib/utils";
import { useProductContext } from "./ProductContext";
import { getCustomerData, logoutUser } from "@/actions/authActions";

export default function Header() {
	const searchParams = useSearchParams();
	const search = searchParams.get("search") || "";

	const existingSearchParams = {
		productTypeId: searchParams.get("productTypeId"),
		sortBy: searchParams.get("sortBy"),
		minPrice: searchParams.get("minPrice" || 0),
		maxPrice: searchParams.get("maxPrice" || 100),
		rating: searchParams.get("rating"),
		inStock: searchParams.get("inStock"),
		openAccordian: searchParams.get("openAccordian"),
	};

	const router = useRouter();

	// 4️⃣ Receives array of object and returns object. If array of object empty, returns empty object.
	const updateSearchParams = (newParamsArray) => {
		const updatedSearchParams = { ...existingSearchParams, search: search }; // make a copy of URL query

		// The reason we need Object.entries() and second forEach() because this function must handle array of objects. Not only one object. And forEach() only works on Array.
		newParamsArray?.forEach((param) => {
			// The 2nd forEach() is using destructuring
			Object.entries(param).forEach(([key, value]) => {
				if (value === null || value === "" || value === "all") {
					delete updatedSearchParams[key];
				} else {
					updatedSearchParams[key] = value;
				}
			});
		});

		router.push(`/?${objectToQueryString(updatedSearchParams)}`);
	};

	// Handle filter
	const handleFilterChange = (filterType, value) => {
		updateSearchParams([
			{
				[filterType]: value,
			},
		]);
	};

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		if (customerData?.id) {
			setDropdownOpen((prev) => !prev);
		} else {
			router.push("/login");
		}
	};

	// The first condition ensures actual DOM element attached the ref
	const handleClickOutsideDropdown = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setDropdownOpen(false);
		}
	};

	// This track "click" activity. If there is click, handleClickOutsideDropdown triggered
	useEffect(() => {
		if (dropdownOpen) {
			document.addEventListener("mousedown", handleClickOutsideDropdown);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutsideDropdown);
		};
	}, [dropdownOpen]);

	// Context for Cart
	const { cartItems, customerData, setCustomerData } = useProductContext();

	// Fetching data for specific customer
	useEffect(() => {
		// We created another function because we want to use await
		if (!customerData?.id) {
			const fetchedData = async () => {
				const res = await getCustomerData();
				setCustomerData(res?.data);
			};
			fetchedData();
		}
	}, []);

	// Handle logout
	const handleLogout = async () => {
		await logoutUser();
		setCustomerData({});
		setDropdownOpen(false);
	};

	return (
		<div className="navbar">
			<div className="container">
				<div className="flex justify-between items-center">
					{/* MyStore Title */}
					<Link href="/">
						<h1 className="text-3xl font-semibold">MyStore</h1>
					</Link>

					{/* Search bar */}
					<div className="relative w-full max-w-lg">
						<SearchIcon className="absolute left-2 top-2 w-7 h-7" />
						<Input
							placeholder="Search Product"
							className="pl-10"
							value={search}
							onChange={(e) => handleFilterChange("search", e.target.value)}
						/>
					</div>

					{/* Shopping & User Icon */}
					<div className="relative" ref={dropdownRef}>
						<div className="flex gap-3">
							<Link href="/cart">
								<div className="relative">
									<div className="absolute rounded-full bg-red-500 text-white w-5 h-5 -right-2 -top-2 text-sx font-semibold flex justify-center items-center">
										{cartItems.length}
									</div>
									<CartIcon className="w-7 h-7" />
								</div>
							</Link>
							<button className="icon-button" onClick={toggleDropdown}>
								<UserIcon className="w-7 h-7" />
							</button>
						</div>

						{/* Dropdown */}
						{dropdownOpen && (
							<div className="dropdown-menu">
								<div className="px-4 py-2 border-b">
									<p className="text-sm font-light">Welcome, </p>
									<p className="text-lg">{customerData.customerName}</p>
								</div>
								<Link
									href="/"
									className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
								>
									My Wishlist
								</Link>
								<button
									className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
