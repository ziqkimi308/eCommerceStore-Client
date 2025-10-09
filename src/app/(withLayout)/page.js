import { getProducts, getProductTypes } from "@/actions/productActions";
import HomeScreen from "@/screens/home";

export default async function Home({ searchParams }) {
	const params = await searchParams

	
	const products = await getProducts(params)
	const productTypeRes = await getProductTypes()
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
