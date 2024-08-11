// components/CategoryItem.tsx
import Image from "next/image";
import React from "react";
import { Category } from "./types"; // Import the type from the shared file

interface CategoryItemProps {
	category: Category;
	onEdit: (category: Category) => void;
	onDelete: (_id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	onEdit,
	onDelete,
}) => {
	return (
		<tr className="border-b">
			<td className="py-3 px-6">{category.name}</td>
			<td className="py-3 px-6">{category.slug}</td>
			<td className="py-3 px-6">
				<Image
					width={100}
					height={100}
					src={category.thumbnail}
					alt={category.name}
					className="h-10 w-10 rounded-full object-cover"
				/>
			</td>
			<td className="py-3 px-6 flex space-x-2">
				<button
					onClick={() => onEdit(category)}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Edit
				</button>
				<button
					onClick={() => onDelete(category._id!)} // Use _id here
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
					Delete
				</button>
			</td>
		</tr>
	);
};
