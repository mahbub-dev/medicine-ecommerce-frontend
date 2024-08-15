import usePagination from "@/hooks/usePagination";
import { useGetProductByCategoryQuery } from "@/store/apis/productApi";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GlobalPagination from "../common/Pagination";
import ProductCard from "./productCard";

interface Product {
	_id: string;
	name: string;
	// Add other product properties as needed
}

interface ProductsByCategoryProps {}

const ProductsByCategory: React.FC<ProductsByCategoryProps> = () => {
	const { query } = useRouter();
	const { page } = usePagination();

	// Extract categories from the query params
	const categoriesQuery = query?.categories as string;
	const categories = categoriesQuery?.split(",");
	const { data, isLoading, error, refetch } = useGetProductByCategoryQuery({
		page,
		limit: 10,
		categories,
	});

	useEffect(() => {
		if (categories?.length > 0) {
			refetch();
		}
	}, [categories, refetch]);

	if (isLoading) return <p>Loading...</p>;
	if (error || data?.products.length === 0) return <p>No Data Found</p>;

	return (
		<div className="container mx-14">
			<h1 className="text-4xl font-bold mb-5">Related Products</h1>
			<div className="mb-5">Categories : {categoriesQuery}</div>
			<div className="grid grid-cols-4 gap-4 grid-wrap">
				{data?.products.map((product: any) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
			<GlobalPagination
				totalPages={data?.totalPages as number}
				onPageChange={(newPage: number) => {
					// Handle pagination change, e.g., update the router with the new page number
				}}
			/>
		</div>
	);
};

export default ProductsByCategory;
