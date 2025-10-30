"use client";

import { StarIcon } from "@/components/Icons";
import { useProductContext } from "@/components/Layout/ProductContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const { addProductToCart, removeProductFromCart, cartItems } =
		useProductContext();
	const isProductInCart = cartItems.some((item) => item.id === product.id);

	const handleCartItems = () => {
		if (isProductInCart) {
			removeProductFromCart(product.id);
		} else {
			addProductToCart({
				...product,
				quantity: 1,
				size: "smallSize",
			});
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-lg w-full h-full max-w-80">
			<Image
				className="w-full h-48 rounded-t-xl object-contain"
				src={`${BASE_URL}${product?.image}`} // ? is optional chaining which if null/undefined, returns undefined instead of error.
				alt="product"
				width={0}
				height={0}
				sizes="100vw"
			/>
			<div className="p-5 space-y-4">
				{/* Product Name and Descriptions */}
				<div className="space-y-1 overflow-hidden">
					{/* Product Name */}
					<Link
						className="font-semibold text-2xl leading-5 truncate"
						href={`/product/${product?.id}`}
					>
						{product?.name}
					</Link>
					{/* Product Description */}
					<p className="text-gray-400 truncate text-md">
						{product?.description}
					</p>
				</div>

				{/* Price, Stock, Star Rating, Product Type */}
				<div className="space-y-0">
					{/* Price and Stock */}
					<div className="flex justify-between items-center">
						<div className="flex gap-x-3 items-center text-xl font-semibold">
							<span className="text-gray-500 line-through">
								${product?.mrp}
							</span>
							<span className="text-2xl">${product?.sellPrice}</span>
						</div>
						<span className="text-gray-400 text-md">
							{product?.currentStock} left
						</span>
					</div>

					{/* Star Rating Icons and Product Type */}
					<div className="flex justify-between items-center">
						<div className="flex gap-x-1">
							{[...Array(product?.rating || 0)].map((_, index) => (
								<StarIcon key={index} />
							))}
						</div>
						<div className="product-type-label">
							{product?.productType?.name}
						</div>
					</div>
				</div>

				{/* Cart, Buy Now */}
				<div className="flex gap-x-2">
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
