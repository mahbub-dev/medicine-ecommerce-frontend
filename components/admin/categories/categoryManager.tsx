import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryForm from "./categoryForm";
import CategoryList from "./categoryLIst";
import { Category } from "./types"; // Import the type from the shared file

const CategoryManager: React.FC = () => {
	const router = useRouter();
	const { query } = router;

	const [categories, setCategories] = useState<Category[]>([]);
	const [editingCategory, setEditingCategory] = useState<Category | null>(
		null
	);
	const [activeCategory, setActiveCategory] = useState<string>("Primary");

	// Set the active category based on the query param when the component mounts
	useEffect(() => {
		if (query.category) {
			setActiveCategory(query.category as string);
		}
	}, [query.category]);

	const handleAddOrUpdateCategory = (category: Category) => {
		if (category._id) {
			setCategories((prevCategories) =>
				prevCategories.map((cat) =>
					cat._id === category._id ? category : cat
				)
			);
		} else {
			setCategories((prevCategories) => [
				...prevCategories,
				{ ...category, _id: `${Date.now()}` }, // Simulate _id for new category
			]);
		}
		setEditingCategory(null);
	};

	const handleEditCategory = (category: Category) => {
		setEditingCategory(category);
	};

	const handleDeleteCategory = (_id: string) => {
		setCategories((prevCategories) =>
			prevCategories.filter((category) => category._id !== _id)
		);
	};

	// Update the query param when the active category changes
	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, category },
			},
			undefined,
			{ shallow: true }
		);
	};

	const renderCategoryManager = () => (
		<>
			<CategoryForm
				initialData={editingCategory || undefined}
				onSubmit={handleAddOrUpdateCategory}
			/>
			<CategoryList
				categories={categories}
				onEdit={handleEditCategory}
				onDelete={handleDeleteCategory}
			/>
		</>
	);

	return (
		<div className="container mx-auto p-6 w-full">
			{/* <h1 className="text-4xl font-bold mb-8">Category Manager</h1> */}

			{/* Navbar */}
			<nav className="flex justify-center mb-6">
				<button
					onClick={() => handleCategoryChange("Primary")}
					className={`px-4 py-2 mx-2 rounded font-semibold ${
						activeCategory === "Primary"
							? "px-3 py-2 text-white bg-gray-700"
							: "bg-gray-300"
					}`}>
					Primary Category
				</button>
				<button
					onClick={() => handleCategoryChange("Secondary")}
					className={`px-4 py-2 mx-2 rounded font-semibold ${
						activeCategory === "Secondary"
							? "px-3 py-2 text-white bg-gray-700"
							: "bg-gray-300"
					}`}>
					Secondary Category
				</button>
				<button
					onClick={() => handleCategoryChange("Tertiary")}
					className={`px-4 py-2 mx-2 rounded font-semibold ${
						activeCategory === "Tertiary"
							? "px-3 py-2 text-white bg-gray-700"
							: "bg-gray-300"
					}`}>
					Tertiary Category
				</button>
			</nav>

			{/* Render Category Manager Based on Active Category */}
			{renderCategoryManager()}
		</div>
	);
};

export default CategoryManager;
