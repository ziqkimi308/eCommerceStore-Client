import { getProducts, getProductTypes } from "@/actions/productActions";
import HomeScreen from "@/screens/home";

export const revalidate = 30

export default async function Home({ searchParams }) {
	const params = await searchParams

	// Parallel fetching
	const [products, productTypeRes] = await Promise.all([
		getProducts(params),
		getProductTypes()
	])
	const productTypes = [
		{ label: "All", value: "all" },
		...productTypeRes?.data?.map((item) => ({ label: item.name, value: item.id }))
	]

	return (
		<><HomeScreen
			params={params}
			products={products}
			productTypes={productTypes}
		/></>
	);
}
