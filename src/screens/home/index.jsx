import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

export default function HomeScreen({ params, products, productTypes }) {
	return (
		<div>
			<h1 className="text-3xl font-semibold">Products</h1>
			<div className="grid grid-cols-4 gap-5 my-5">
				<FilterSection params={params} productTypes={productTypes} />
				<div className="col-span-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
					{products?.data.length > 0 ? (
						products.data?.map((product) => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<div className="flex justify-center items-center col-span-2">
							<span className="text-3xl font-medium">Product Not Found.</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
