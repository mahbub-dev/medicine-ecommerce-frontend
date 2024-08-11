// components/CategoryForm.tsx
import React, { useEffect, useState } from "react";

interface CategoryFormProps {
	initialData?: {
		_id?: string;
		name: string;
		slug: string;
		thumbnail: string;
	};
	onSubmit: (data: {
		_id?: string;
		name: string;
		slug: string;
		thumbnail: string;
	}) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
	initialData,
	onSubmit,
}) => {
	const [name, setName] = useState(initialData?.name || "");
	const [slug, setSlug] = useState(initialData?.slug || "");
	const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ _id: initialData?._id, name, slug, thumbnail });
	};

	useEffect(() => {
		if (initialData) {
			setName(initialData.name);
			setSlug(initialData.slug);
			setThumbnail(initialData.thumbnail);
		}
	}, [initialData]);

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white shadow-md rounded-lg p-6 mt-4"
		>
			<h2 className="text-2xl font-bold mb-4">
				{initialData ? "Edit Category" : "Add Category"}
			</h2>
			<div className="mb-4">
				<label className="block text-gray-700">Name</label>
				<input
					type="text"
					className="w-full px-4 py-2 border rounded-md focus:outline-none"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Slug</label>
				<input
					type="text"
					className="w-full px-4 py-2 border rounded-md focus:outline-none"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Thumbnail</label>
				<input
					type="text"
					className="w-full px-4 py-2 border rounded-md focus:outline-none"
					value={thumbnail}
					onChange={(e) => setThumbnail(e.target.value)}
					required
				/>
			</div>
			<div className="flex justify-end space-x-4">
				<button
					type="submit"
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
				>
					{initialData ? "Update Category" : "Add Category"}
				</button>
			</div>
		</form>
	);
};

export default CategoryForm;
