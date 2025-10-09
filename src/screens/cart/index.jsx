"use client";

import {
	DeleteIcon,
	MinusCircleIcon,
	PlusCircleIcon,
	StarIcon,
} from "@/components/Icons";
import { useProductContext } from "@/components/Layout/ProductContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
	const sizeOptions = [
		{ label: "S", value: "smallSize" },
		{ label: "M", value: "mediumSize" },
		{ label: "L", value: "largeSize" },
	];

	const {
		cartItems,
		setCartItems,
		increaseQuantity,
		decreaseQuantity,
		removeProductFromCart,
		totalAmount,
		customerData,
	} = useProductContext();

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const router = useRouter(); // useRouter() is nextjs hook
	const handleCheckout = () => {
		if (customerData?.id) {
			router.push("/checkout");
		} else {
			router.push("/login")
		}
	};

	return (
		<div className="my-10">
			<h1 className="text-3xl font-semibold">Cart</h1>

			<div className="grid grid-cols-4 gap-5 my-5">
				{/* Cart Items */}
				<div className="col-span-3 space-y-5">
					{cartItems.length > 0 ? (
						cartItems.map((item, index) => {
							return (
								<div
									key={index}
									className="w-full bg-white shadow-md rounded-xl"
								>
									<div className="grid grid-cols-[auto_1fr]">
										{/* Product Image */}
										<Image
											className="w-60 h-60 object-cover rounded-l-xl m-auto"
											src={`${BASE_URL}${item?.image}`}
											alt="product"
											width={0}
											height={0}
											sizes="100vw"
										/>
										<div className="flex flex-col p-8 justify-between">
											<div>
												{/* Product Name and Type */}
												<div className="flex justify-between">
													<h1 className="text-2xl font-medium">{item?.name}</h1>
													<div className="product-type-label">
														{item?.productType?.name}
													</div>
												</div>
												{/* Star Rating */}
												<div className="flex gap-x-1">
													{[...Array(item?.rating || 0)].map((_, index) => (
														<StarIcon key={index} />
													))}
												</div>
											</div>

											{/* Prices */}
											<div className="text-xl flex gap-x-3 items-center">
												<span className="text-gray-500 line-through font-medium">
													${item?.mrp}
												</span>
												<span className="text-2xl font-semibold">
													${item?.sellPrice}
												</span>
											</div>

											<div className="flex justify-between items-center">
												{/* Add/Reduce Quantity Button */}
												<div className="flex gap-x-4 items-center">
													<Button
														className="p-0 text-black bg-transparent hover:shadow-none"
														onClick={() => {
															if (item.quantity > 1) {
																decreaseQuantity(item.id);
															}
														}}
														disabled={item.quantity === 1}
													>
														<MinusCircleIcon
															className={cn(
																"w-8 h-8",
																item.quantity === 1 &&
																	"opacity-50 cursor-not-allowed"
															)}
														/>
													</Button>
													<span className="text-xl font-semibold">
														{item?.quantity}
													</span>
													<Button
														className="p-0 text-black bg-transparent hover:shadow-none"
														onClick={() => increaseQuantity(item.id)}
														disabled={item.quantity === item[item.size]}
													>
														<PlusCircleIcon
															className={cn(
																"w-8 h-8",
																item.quantity === item[item.size] &&
																	"opacity-50 cursor-not-allowed"
															)}
														/>
													</Button>
												</div>

												{/* Sizes */}
												<div className="flex items-center gap-x-4">
													<h6 className="text-lg font-semibold">Size</h6>
													<div className="flex flex-wrap gap-3">
														{sizeOptions
															.filter((size) => item[size.value] !== 0)
															.map((size, index) => {
																return (
																	<div key={index}>
																		<input
																			type="radio"
																			id={`sizes-${size.value}-${item.id}`}
																			name={`sizes-${item.id}`}
																			className="hidden peer"
																			checked={item.size === size.value}
																			value={size.value}
																			onChange={() =>
																				setCartItems((prev) =>
																					prev.map((product) =>
																						product.id === item.id
																							? {
																									...product,
																									size: size.value,
																									quantity: 1,
																							  }
																							: product
																					)
																				)
																			}
																		/>
																		<label
																			htmlFor={`sizes-${size.value}-${item.id}`}
																			className="checkbox-button-label"
																		>
																			{size.label}
																		</label>
																	</div>
																);
															})}
													</div>
												</div>

												{/* Delete Button */}
												<Button
													className="w-fit flex items-center gap-2 bg-red-500"
													onClick={() => removeProductFromCart(item.id)}
												>
													<DeleteIcon />
													<span>Remove</span>
												</Button>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className="flex justify-center items-align col-span-2 my-5">
							<span className="text-3xl font-medium">Cart is empty.</span>
						</div>
					)}
				</div>

				{/* Cart Summary */}
				<div className="sticky top-5 h-fit">
					<div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between gap-y-5">
						<h1 className="text-2xl font-semibold border-b">Cart Summary</h1>

						{/* List of products in cart */}
						<div className="space-y-3">
							{cartItems.map((item, index) => {
								return (
									<div className="grid grid-cols-2 gap-2 text-xl" key={index}>
										<span className="truncate">{item?.name}</span>
										<span className="text-end">
											${Number(item?.sellPrice * item.quantity).toFixed(2)}
										</span>
									</div>
								);
							})}
						</div>
						{/* Total amount in cart */}
						<div className="border-t">
							<div className="grid grid-cols-2 gap-2 text-xl font-semibold mt-2">
								<span>Total Amount</span>
								<span className="text-end">${totalAmount.toFixed(2)}</span>
							</div>
						</div>
					</div>
					{/* Button checkout */}
					<Button 
					className="w-full mt-2" 
					onClick={handleCheckout}
					disabled={cartItems.length === 0}
					>
						{customerData?.id ? "Checkout" : "Login to Checkout"}
					</Button>
				</div>
			</div>
		</div>
	);
}
