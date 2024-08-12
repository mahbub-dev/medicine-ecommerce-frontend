import { ICategory, useGetSubCategoriesByIdQuery } from "@/store/categoryApi";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";

interface CategorySelectProps {
	name: string;
	label: string;
	selectedCategory?: string;
	onCategoryChange: (categoryId: string) => void;
	parentCategoryId?: string;
	level: "primary" | "secondary" | "tertiary";
}

const CategorySelect: React.FC<CategorySelectProps> = ({
	name,
	label,
	selectedCategory,
	onCategoryChange,
	parentCategoryId,
	level,
}) => {
	const [categories, setCategories] = useState<ICategory[]>([]);

	// Select the correct query based on the level and parentCategoryId
	const { data, isLoading, error } = useGetSubCategoriesByIdQuery({
		parentCategoryId: parentCategoryId as string,
		page: 1,
		limit: 100,
		level,
	}); // Fetch subcategories for secondary or tertiary

	useEffect(() => {
		if (data && data.categories) {
			setCategories(data.categories);
		}
	}, [data]);
	if (error) return <></>;
	return (
		<div className="mb-4">
			<label className="block text-gray-700">{label}</label>
			<Field
				as="select"
				name={name}
				value={selectedCategory}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
					onCategoryChange(e.target.value);
				}}
				className="w-full px-4 py-2 border rounded-md focus:outline-none">
				<option value="">Select Category</option>
				{categories.map((category) => (
					<option key={category._id} value={category._id}>
						{category.name}
					</option>
				))}
			</Field>
			<ErrorMessage
				name={name}
				component="div"
				className="text-red-500"
			/>
		</div>
	);
};

export default CategorySelect;
