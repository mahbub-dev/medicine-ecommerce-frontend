import GlobalPagination from "@/components/common/Pagination";
import {
	ICategory,
	useDeleteCategoryMutation,
} from "@/store/categoryApi"; // Adjust the import according to your API slice
import React from "react";
import { toast } from "react-toastify";
import { CategoryItem } from "./categoryItem";

interface CategoryListProps {
	categories: ICategory[]; // Array of categories to be displayed
	refetch: () => void; // Function to refetch data
	isChlid?: boolean;
	totalPages: number;
}
const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	totalPages,
	refetch,
	isChlid,
}) => {
	const [deleteCategory] = useDeleteCategoryMutation();
	const handleDelete = async (_id: string) => {
		try {
			await deleteCategory(_id).unwrap();
			refetch();
			toast.success("Category deleted successfully");
		} catch (error: any) {
			toast.error(
				error?.data?.message || "Failed to delete the category"
			);
		}
	};

	return (
		<div className="overflow-x-auto shadow-md rounded-lg pb-4 mt-4">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Slug</th>
						<th className="py-3 px-6 text-left">Thumbnail</th>
						<th className="py-3 px-6 text-left">Level</th>
						{!isChlid && (
							<th className="py-3 px-6 text-left">
								Parent Category
							</th>
						)}
						<th className="py-3 px-6 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{categories.map((category: ICategory) => (
						<CategoryItem
							key={category._id}
							category={category}
							onEdit={() => {}}
							isChlid={isChlid}
							onDelete={handleDelete}
						/>
					))}
				</tbody>
			</table>
			<GlobalPagination
				// total={totalData}
				totalPages={totalPages}
				onPageChange={(newPage) => {}}
			/>
		</div>
	);
};

export default CategoryList;
