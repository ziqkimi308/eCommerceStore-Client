import { getProductById } from "@/actions/productActions";
import Product from "@/screens/product";

// export const revalidate = 60

export default async function ProductPage({ params }) {
	const {productId} = await params;
	const product = await getProductById(productId);
	console.log({product})

	return (
		<>
			<Product product={product?.data} />
		</>
	);
}
