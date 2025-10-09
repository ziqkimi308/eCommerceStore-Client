"use client";

import Accordian from "@/components/ui/Accordian";
import PriceRangeSlider from "@/components/ui/PriceRangeSlider";
import { objectToQueryString } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function FilterSection({ params, productTypes }) {
	const sortByItems = [
		{ label: "All", value: "all" },
		{ label: "Price high to low", value: "-sellPrice" },
		{ label: "Price low to high", value: "sellPrice" },
	];

	const ratingItems = [
		{ label: "All", value: "all" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	];

	const availabilityItems = [
		{ label: "All", value: "all" },
		{ label: "In Stock", value: "true" },
		{ label: "Out of Stock", value: "false" },
	];

	const productTypeId = params.productTypeId || "all";
	const sortBy = params.sortBy || "all";
	const rating = params.rating || "all";
	const inStock = params.inStock || "all";

	const router = useRouter();

	// 1️⃣ Return an array of value from 'openAccordian' query parameter from URL query. If query parameters empty, returns an empty array.
	// searchParams returns URL query in object format (URL query refer to part after ? symbol in URL)
	const openAccordian = params.openAccordian?.split(",") || [];

	// 4️⃣ Receives array of object and returns object. If array of object empty, returns empty object.
	const updateSearchParams = (newParamsArray) => {
		const updatedSearchParams = { ...params }; // make a copy of URL query

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

	// 3️⃣ Receives and check if value exists in openAccordian. If exists, remove from array. If does not exists, add to array. Call and send argument to updateSearchParams in the form of array of object.
	const handleAccordian = (value) => {
		const newOpenAccordian = openAccordian.includes(value)
			? openAccordian.filter((item) => item !== value)
			: [...openAccordian, value]; // If "category" is not open, it adds it.
		updateSearchParams([{ openAccordian: newOpenAccordian.join(",") }]);
	};

	// Price Slider Indicator
	const minPrice = params.minPrice || "0";
	const maxPrice = params.maxPrice || "100";
	const handlePriceRangeChange = (value) => {
		updateSearchParams([{ minPrice: value[0] }, { maxPrice: value[1] }]);
	};

	// Handle filter
	const handleFilterChange = (filterType, value) => {
		updateSearchParams([
			{
				[filterType]: value,
			},
		]);
	};

	return (
		<div className="bg-white rounded-lg shadow-lg space-y-3 h-fit p-5">
			<h1 className="text-2xl mb-8 font-semibold">Filters</h1>
			{/* Category */}
			<Accordian
				title="Category"
				isOpened={openAccordian.includes("productTypeId")}
				type="productTypeId"
				handleAccordian={handleAccordian}
			>
				<div className="flex gap-3 flex-wrap pt-2">
					{productTypes.map((item, index) => {
						return (
							<div key={index}>
								<input
									type="checkbox"
									id={`productType-${item.value}`}
									className="hidden peer"
									name="productTypeId"
									value={item.value}
									checked={productTypeId == item.value}
									onChange={() =>
										handleFilterChange("productTypeId", item.value)
									}
								/>
								<label
									htmlFor={`productType-${item.value}`}
									className="checkbox-button-label"
								>
									{item.label}
								</label>
							</div>
						);
					})}
				</div>
			</Accordian>
			{/* Sort By */}
			<Accordian
				title="Sort By"
				isOpened={openAccordian.includes("sortBy")}
				type="sortBy"
				handleAccordian={handleAccordian}
			>
				<div className="flex gap-3 flex-wrap pt-2">
					{sortByItems.map((item, index) => {
						return (
							<div key={index}>
								<input
									type="checkbox"
									id={`sortBy-${item.value}`}
									className="hidden peer"
									name="sortBy"
									value={item.value}
									checked={sortBy == item.value}
									onChange={() => handleFilterChange("sortBy", item.value)}
								/>
								<label
									htmlFor={`sortBy-${item.value}`}
									className="checkbox-button-label"
								>
									{item.label}
								</label>
							</div>
						);
					})}
				</div>
			</Accordian>
			{/* Price Range */}
			<Accordian
				title="Price Range"
				isOpened={openAccordian.includes("priceRange")}
				type="priceRange"
				handleAccordian={handleAccordian}
			>
				<div className="p-3">
					<PriceRangeSlider
						minValue={0}
						maxValue={100}
						value={[minPrice, maxPrice]}
						handleChange={handlePriceRangeChange}
						step={1}
					/>
				</div>
				<div className="flex justify-between mt-2">
					<span>${minPrice}</span>
					<span>${maxPrice}</span>
				</div>
			</Accordian>
			{/* Rating */}
			<Accordian
				title="Rating"
				isOpened={openAccordian.includes("rating")}
				type="rating"
				handleAccordian={handleAccordian}
			>
				<div className="flex gap-3 flex-wrap pt-2">
					{ratingItems.map((item, index) => {
						return (
							<div key={index}>
								<input
									type="checkbox"
									id={`rating-${item.value}`}
									className="hidden peer"
									name="rating"
									value={item.value}
									checked={rating == item.value}
									onChange={() => handleFilterChange("rating", item.value)}
								/>
								<label
									htmlFor={`rating-${item.value}`}
									className="checkbox-button-label"
								>
									{item.label}
								</label>
							</div>
						);
					})}
				</div>
			</Accordian>
			{/* Availability */}
			<Accordian
				title="Availability"
				isOpened={openAccordian.includes("inStock")}
				type="inStock"
				handleAccordian={handleAccordian}
			>
				<div className="flex gap-3 flex-wrap pt-2">
					{availabilityItems.map((item, index) => {
						return (
							<div key={index}>
								<input
									type="checkbox"
									id={`availability-${item.value}`}
									className="hidden peer"
									name="inStock"
									value={item.value}
									checked={inStock == item.value}
									onChange={() => handleFilterChange("inStock", item.value)}
								/>
								<label
									htmlFor={`availability-${item.value}`}
									className="checkbox-button-label"
								>
									{item.label}
								</label>
							</div>
						);
					})}
				</div>
			</Accordian>
		</div>
	);
}
