import usePagination from "@/hooks/usePagination";
import { useGetProductByCategoryQuery } from "@/store/productApi";
import Link from "next/link";
import React, { useEffect } from "react";
import ProductCard from "./productCard";

interface Product {
	_id: string;
	name: string;
	// Add other product properties as needed
}

interface ProductsByCategoryProps {
	categories: string[];
	productId: string;
}

const RelatedProduct: React.FC<ProductsByCategoryProps> = ({
	categories,
	productId,
}) => {
	const { page } = usePagination();
	const { data, isLoading, error, refetch } = useGetProductByCategoryQuery({
		page,
		limit: 10,
		categories: categories,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) return <p className="flex items-center justify-center">Loading...</p>;
	if (error) return <p className="flex items-center justify-center">{"No Data Found"}</p>;

	return (
		<div className="mt-10 ">
			<h1 className="text-4xl font-bold mb-5">Related</h1>
			<div className="flex flex-wrap gap-4 ">
				{data?.products.length === 0
					? "No data found"
					: data?.products
							.filter((item: any) => item._id !== productId)
							.map((product: any) => (
								<ProductCard
									product={product}
									key={product._id}
								/>
							))}
			</div>
			{(data?.products?.length as number) > 6 && (
				<Link
					href={`/related-products?categories=${categories}`}
					className="px-3 mx-auto block w-[200px] mt-5 text-white py-2 rounded bg-gray-500 text-center">
					{" "}
					View More{" "}
				</Link>
			)}
		</div>
	);
};

export default RelatedProduct;
