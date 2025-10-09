import { getProductById } from "@/actions/productActions";
import Product from "@/screens/product";

export default async function ProductPage({ params }) {
	const {productId} = await params;
	const product = await getProductById(productId);

	return (
		<>
			<Product product={product?.data} />
		</>
	);
}
