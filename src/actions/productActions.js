"use server"

import { objectToQueryString } from "@/lib/utils"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Fetch product
export async function getProducts(params) {
	const filteredParams = { ...params }
	delete filteredParams.openAccordian

	const res = await fetch(`${BASE_URL}/api/products?${objectToQueryString(filteredParams)}`,
		{
			cache: 'no-store', // Always fresh for filtered results
		}
	)
	const data = await res.json()

	// revalidatePath("/", "page")
	return data
}

// Fetch product type
export async function getProductTypes() {
	const res = await fetch(`${BASE_URL}/api/products/product-type`,
		{
			cache: 'no-store'
		}
	)
	const data = await res.json()

	return data
}

// Fetch unique product
export async function getProductById(productId) {
	const res = await fetch(`${BASE_URL}/api/products/${productId}`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()

	return data
}