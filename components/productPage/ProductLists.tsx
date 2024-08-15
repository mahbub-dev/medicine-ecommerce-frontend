// pages/products.tsx
import usePagination from "@/hooks/usePagination";
import { useGetProductsQuery } from "@/store/apis/productApi";
import { useEffect } from "react";
import GlobalPagination from "../common/Pagination";
import ProductCard from "./productCard";

const ProductList = () => {
	const { page } = usePagination();
	const { data, error, isLoading, refetch } = useGetProductsQuery({
		page,
		limit: 10,
	});
	useEffect(() => {
		refetch();
	}, [refetch]);
	// Pass the product ID or parameter as needed
	if (isLoading) return <div>Loading...</div>;
	if (data?.products?.length as number === 0 || error) return <div>No Data Found</div>;

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-5">Our Products</h1>
			<div className="flex flex-wrap gap-4 grid-wrap">
				{data?.products.map((product: any) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>

			{(data?.products.length as number) > 0 && (
				<GlobalPagination
					totalPages={data?.totalPages as number}
					onPageChange={function (page: number): void {}}
				/>
			)}
		</div>
	);
};

export default ProductList;
