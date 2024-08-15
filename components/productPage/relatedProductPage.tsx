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

	if (isLoading)
		return (
			<p className="min-h-[60vh] flex items-center justify-center">
				Loading...
			</p>
		);
	if (error || data?.products.length === 0)
		return (
			<p className="min-h-[60vh] flex items-center justify-center">
				No Data Found
			</p>
		);

	return (
		<div className="">
			<h1 className="text-3xl font-bold mb-5">Related Products</h1>
			<div className="mb-5">Categories : {categoriesQuery}</div>
			<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4 ">
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
