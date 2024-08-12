import GlobalPagination from "@/components/common/Pagination";
import { useDeleteProductMutation } from "@/store/productApi";
import React from "react";
import { toast } from "react-toastify";
import { IProduct } from "./types"; // Import necessary types

interface ProductListProps {
	products: IProduct[];
	onEdit: (product: IProduct) => void;
	total: number;
	page: number;
	limit: number;
	onPageChange: (newPage: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onEdit,
	total,
	page,
	limit,
	onPageChange,
}) => {
	const [deleteProduct] = useDeleteProductMutation();
	const totalPages = Math.ceil(total / limit);

	const handleDelete = async (id: string) => {
		try {
			await deleteProduct(id).unwrap();
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error("Failed to delete product");
		}
	};

	return (
		<div className="overflow-x-auto shadow-md rounded-lg mt-4">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Slug</th>
						<th className="py-3 px-6 text-left">Price</th>
						<th className="py-3 px-6 text-left">Status</th>
						<th className="py-3 px-6 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{products.map((product) => (
						<tr key={product._id} className="border-b">
							<td className="py-3 px-6">{product.name}</td>
							<td className="py-3 px-6">{product.slug}</td>
							<td className="py-3 px-6">{product.price}</td>
							<td className="py-3 px-6">{product.status}</td>
							<td className="py-3 px-6 flex space-x-2">
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
			<GlobalPagination
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default ProductList;
