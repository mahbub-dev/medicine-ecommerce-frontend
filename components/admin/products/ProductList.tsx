import GlobalPagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from "@/store/apis/productApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { IProduct } from "./types"; // Import necessary types

interface ProductListProps {
	onEdit: (product: IProduct) => void;
	onPageChange: (newPage: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit, onPageChange }) => {
	const { page } = usePagination();
	const [deleteProduct] = useDeleteProductMutation();
	// Fetch products based on the current page
	const { data, error, isLoading, refetch } = useGetProductsQuery({
		page,
		limit: 10,
	});
	useEffect(() => {
		refetch();
	}, [refetch]);
	// Handle delete operation
	const handleDelete = async (id: string) => {
		try {
			await deleteProduct(id).unwrap();
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Failed to delete product");
		}
	};
	if (isLoading)
		return (
			<div className="flex items-center min-h-screen justify-center">
				Loading...
			</div>
		);
	if (error)
		return (
			<div className="flex items-center min-h-screen justify-center">
				No Products Found.
			</div>
		);
	return (
		<div className="overflow-x-auto shadow-md rounded-lg py-4">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Slug</th>
						{/* <th className="py-3 px-6 text-left">Price</th> */}
						<th className="py-3 px-6 text-left">Status</th>
						<th className="py-3 px-6 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{data?.products?.map((product) => (
						<tr key={product._id} className="border-b">
							<td className="py-3 px-6">{product.name}</td>
							<td className="py-3 px-6">{product.slug}</td>
							{/* <td className="py-3 px-6">
										{product.price}
									</td> */}
							<td className="py-3 px-6">{product.status}</td>
							<td className="py-3 px-6 flex space-x-2">
								<Link
									href={`/admin/products/${product._id}`}
									className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
									View
								</Link>
								<button
									onClick={() => onEdit(product)}
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
									Edit
								</button>
								<button
									onClick={() =>
										handleDelete(product._id as string)
									}
									className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{(data?.products.length as number) > 0 && (
				<GlobalPagination
					totalPages={data?.totalPages ?? 1}
					onPageChange={onPageChange}
				/>
			)}
		</div>
	);
};

export default ProductList;
