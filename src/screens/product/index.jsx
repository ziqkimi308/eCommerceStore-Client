"use client";

import { StarIcon } from "@/components/Icons";
import { useProductContext } from "@/components/Layout/ProductContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function Product({ product }) {
	// Context for cart
	const { cartItems, addProductToCart, removeProductFromCart } =
		useProductContext();
	const isProductInCart = cartItems.some((item) => item.id === product.id);
	const [selectedSize, setSelectedSize] = useState("smallSize");

	const handleCartItems = () => {
		if (isProductInCart) {
			removeProductFromCart(product.id);
		} else {
			addProductToCart({
				...product,
				quantity: 1,
				size: selectedSize,
			});
		}
	};

	// Constants
	const sizeOptions = [
		{ label: "S", value: "smallSize" },
		{ label: "M", value: "mediumSize" },
		{ label: "L", value: "largeSize" },
	];
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	// If no product
	if (!product) {
		return (
			<div className="text-center py-20">
				<h1 className="text-3xl font-bold">Product Not Found</h1>
			</div>
		);
	}

	return (
		<div className="my-10 p-5 rounded-xl bg-white grid grid-cols-2 gap-5 max-w-4xl mx-auto">
			{/* Image */}
			<div className="w-full h-full bg-gray-100 rounded-xl p-3">
				<Image
					className="w-full h-full max-h-[calc(100vh-150px)] rounded-xl m-auto" // image dimension controlled by either this or width and height
					src={`${BASE_URL}${product?.image}`}
					alt="product"
					width={0}
					height={0}
					sizes="100vw"
				/>
			</div>

			<div className="px-5">
				{/* Product Type */}
				<div className="flex justify-end">
					<div className="product-type-label">{product?.productType.name}</div>
				</div>
				{/* Product Name */}
				<h1 className="text-2xl font-medium">{product?.name}</h1>
				{/* Star Rating */}
				<div className="flex gap-x-1">
					{[...Array(product?.rating || 0)].map((_, index) => (
						<StarIcon key={index} />
					))}
				</div>
				{/* Prices */}
				<div className="my-7">
					<h6 className="text-sm text-green-600 font-medium">Special Price</h6>
					<div className="text-xl font-medium flex gap-x-3 items-center">
						<span className="text-2xl">${product?.sellPrice}</span>
						<span className="line-through text-gray-500">${product?.mrp}</span>
					</div>
					<span className="text-gray-500 font-medium">
						{product?.currentStock} item left
					</span>
				</div>
				{/* Sizes */}
				<div className="my-7 space-y-1">
					<h6 className="text-lg font-semibold">Size</h6>
					<div className="flex flex-wrap gap-3">
						{sizeOptions
							.filter((size) => product[size.value] !== 0)
							.map((item, index) => (
								<div key={index}>
									<input
										type="radio"
										id={`sizes-${item.value}`}
										name="sizes"
										className="hidden peer"
										value={item.value}
										checked={selectedSize === item.value}
										onChange={() => setSelectedSize(item.value)}
									/>
									<label
										htmlFor={`sizes-${item.value}`}
										className="checkbox-button-label"
									>
										{item.label}
									</label>
								</div>
							))}
					</div>
				</div>
				{/* Description */}
				<p className="text-lg font-semibold">Description</p>
				<p className="text-gray-600">{product?.description}</p>
				{/* Add to Cart/Buy Button */}
				<div className="flex gap-x-5 my-7">
					<Button
						className={cn(
							"w-full custom-outline-btn",
							isProductInCart && "border-red-400 text-red-500"
						)}
						onClick={handleCartItems}
					>
						{isProductInCart ? "Remove from Cart" : "Add to Cart"}
					</Button>
					<Button className="w-full">Buy Now</Button>
				</div>
			</div>
		</div>
	);
}
