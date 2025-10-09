"use client";

import { useContext, createContext, useState } from "react";

// Create context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [customerData, setCustomerData] = useState({});

	const addProductToCart = (newProduct) => {
		setCartItems((prev) => [...prev, newProduct]);
	};

	const removeProductFromCart = (productId) => {
		setCartItems((prev) => prev.filter((product) => product.id !== productId));
	};

	const increaseQuantity = (productId) => {
		setCartItems((prev) =>
			prev.map((product) => {
				return product.id === productId
					? { ...product, quantity: product.quantity + 1 }
					: product;
			})
		);
	};

	const decreaseQuantity = (productId) => {
		setCartItems((prev) =>
			prev.map((product) => {
				return product.id === productId
					? { ...product, quantity: product.quantity - 1 }
					: product;
			})
		);
	};

	// reduce(accumulated, current)
	const totalAmount = cartItems.reduce((total, item) => {
		return total + item.quantity * item.sellPrice;
	}, 0);

	// We pass literal object through value
	return (
		<ProductContext.Provider
			value={{
				cartItems,
				setCartItems,
				addProductToCart,
				removeProductFromCart,
				increaseQuantity,
				decreaseQuantity,
				totalAmount,
				customerData,
				setCustomerData
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	return useContext(ProductContext);
};
