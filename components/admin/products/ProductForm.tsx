import {
    useCreateProductMutation,
    useUpdateProductMutation,
} from "@/store/productApi"; // Replace with your product API slice
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Category } from "../categories/types";
import { IProduct, Variant } from "./types"; // Import necessary types

interface ProductFormProps {
	initialData?: any; // Replace `any` with the correct product type
	onSubmit?: () => void;
	categories: Category[];
	variants: Variant[];
}

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	slug: Yup.string().required("Slug is required"),
	description: Yup.string().required("Description is required"),
	price: Yup.number().required("Price is required"),
	discount: Yup.number(),
	stockStatus: Yup.boolean(),
	status: Yup.string()
		.oneOf(["active", "inactive"])
		.required("Status is required"),
	category: Yup.string().required("Category is required"),
});

const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	onSubmit,
	categories,
	variants,
}) => {
	const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
	const [photos, setPhotos] = useState<File[]>([]);

	const [createProduct, { isLoading }] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();

	const initialValues = {
		name: initialData?.name || "",
		slug: initialData?.slug || "",
		description: initialData?.description || "",
		metaKey: initialData?.metaKey || "",
		price: initialData?.price || 0,
		discount: initialData?.discount || 0,
		stockStatus: initialData?.stockStatus || true,
		status: initialData?.status || "active",
		category: initialData?.category || "",
		variants: initialData?.variants || [],
	};
	useEffect(() => {
		if (initialData?.variants) {
			setSelectedVariants(initialData.variants);
		}
	}, [initialData]);

	const handleVariantChange = (variantId: string) => {
		setSelectedVariants((prev) =>
			prev.includes(variantId)
				? prev.filter((id) => id !== variantId)
				: [...prev, variantId]
		);
	};

	const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhotos(Array.from(e.target.files));
		}
	};

	const handleSubmit = async (
		values: Partial<IProduct>,
		{ resetForm }: any
	) => {
		try {
			const formData = new FormData();
			photos.forEach((photo) => formData.append("photos", photo));
			formData.append("name", values.name as string);
			formData.append("slug", values.slug as string);
			formData.append("description", values.description as string);
			formData.append("metaKey", values.metaKey as any);
			formData.append("price", values.price as any);
			formData.append("discount", values.discount as any);
			formData.append("stockStatus", values.stockStatus as any);
			formData.append("status", values.status as string);
			formData.append("category", values.category as any);
			formData.append("variants", JSON.stringify(selectedVariants));

			if (initialData && initialData._id) {
				await updateProduct({ ...values, photos }).unwrap();
			} else {
				await createProduct(formData).unwrap();
				toast.success("Product added successfully");
			}

			if (onSubmit) onSubmit();
			resetForm();
		} catch (error: any) {
			toast.error(error.data?.message || "Something went wrong");
		}
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			{({ setFieldValue }) => (
				<form
					className="bg-white p-6 shadow-lg rounded-lg"
					onSubmit={Formik}>
					<h2 className="text-2xl font-bold mb-4">
						{initialData ? "Edit Product" : "Add Product"}
					</h2>

					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<Field
							name="name"
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Slug</label>
						<Field
							name="slug"
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
						<ErrorMessage
							name="slug"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Description
						</label>
						<Field
							name="description"
							as="textarea"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
						<ErrorMessage
							name="description"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Photos</label>
						<input
							type="file"
							multiple
							onChange={handlePhotosChange}
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Category</label>
						<Field
							as="select"
							name="category"
							className="w-full px-4 py-2 border rounded-md focus:outline-none">
							<option value="">Select Category</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</Field>
						<ErrorMessage
							name="category"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Variants</label>
						{variants.map((variant) => (
							<div key={variant._id}>
								<Field
									type="checkbox"
									value={variant._id}
									checked={selectedVariants.includes(
										variant._id as string
									)}
									onChange={() =>
										handleVariantChange(
											variant._id as string
										)
									}
								/>
								<label className="ml-2">{variant.name}</label>
							</div>
						))}
					</div>

					<div className="flex justify-end space-x-4">
						<button
							type="submit"
							disabled={isLoading}
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							{isLoading
								? "Please wait..."
								: initialData
								? "Update Product"
								: "Add Product"}
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default ProductForm;
