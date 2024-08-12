/* eslint-disable @next/next/no-img-element */
import { ICategory } from "@/store/categories/categoryApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface CategoryItemProps {
	category: ICategory;
	onEdit: any;
	isChlid?: boolean;
	onDelete: (_id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	onEdit,
	isChlid,
	onDelete,
}) => {
	const router = useRouter();
	return (
		<tr className="border-b">
			<td className="py-3 px-6">{category.name}</td>
			<td className="py-3 px-6">{category.slug}</td>
			<td className="py-3 px-6">
				<img
					width={100}
					height={100}
					src={`${category.thumbnail}`}
					alt={category.name}
					className="h-10 w-10 rounded-full object-cover"
				/>
			</td>
			<td className="py-3 px-6">
				{category.level.charAt(0).toUpperCase() +
					category.level.slice(1)}
			</td>
			{!isChlid && (
				<td
					className="py-3 px-6 cursor-pointer hover:underline"
					onClick={() => {
						router.push(
							`/admin/categories/${category.parentCategory}`
						);
					}}>
					{category.parentCategory
						? category?.parentCategoryDetails?.name
						: "N/A"}
				</td>
			)}
			<td className="py-3 px-6 flex space-x-2">
				<Link
					href={`/admin/categories/${category._id}`}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
					View
				</Link>
				<button
					onClick={() => onDelete(category._id!)} // Use _id here
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
					Delete
				</button>
			</td>
		</tr>
	);
};
