import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from "@/store/apis/productApi"; // Replace with your product API slice
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Category } from "../categories/types";
import CategoryHierarchySelect from "./categorySelect";
import { IProduct, Variant } from "./types"; // Import necessary types
interface ProductFormProps {
	initialData?: any; // Replace `any` with the correct product type
	onSubmit?: (data: any) => void;
	categories: Category[];
	variants: Variant[];
}

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	slug: Yup.string().required("Slug is required"),
	description: Yup.string().required("Description is required"),
	metaKey: Yup.string().required("Meta Key is required"),
	discount: Yup.number(),
	categories: Yup.array()
		.min(1, "At least one category is required") // Ensures the array has at least 1 item
		.required("Category is required"),
	inStock: Yup.number()
		.required("Stock is required")
		.min(1, "Stock must be at least 1"),
	status: Yup.string().oneOf(["active", "inactive"]),
});

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
	const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
	const [photos, setPhotos] = useState<File[]>([]);

	const [createProduct, { isLoading, data }] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();

	const initialValues = {
		name: initialData?.name || "",
		slug: initialData?.slug || "",
		description: initialData?.description || "",
		metaKey: initialData?.metaKey || "",
		discount: initialData?.discount || 0,
		inStock: initialData?.inStock || 0,
		status: initialData?.status || "active",
		categories: initialData?.categories || [],
		variants: initialData?.variants || [],
	};

	useEffect(() => {
		if (initialData?.variants) {
			setSelectedVariants(initialData.variants);
		}
	}, [initialData]);

	const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhotos(Array.from(e.target.files));
		}
	};

	const handleSubmit = async (
		values: Partial<IProduct>,
		{ resetForm, setFieldError }: any
	) => {
		try {
			const formData = new FormData();
			photos.forEach((photo) => formData.append("photos", photo));
			formData.append("name", values.name as string);
			formData.append("slug", values.slug as string);
			formData.append("description", values.description as string);
			formData.append("metaKey", values.metaKey as any);
			formData.append("discount", values.discount as any);
			formData.append("inStock", values.inStock as any);
			formData.append("status", values.status as string);
			formData.append("categories", values.categories as any);
			formData.append("variants", JSON.stringify(selectedVariants));
			// if (values.categories?.length === 0) {
			// 	setFieldError("category", "Category is required");
			// }
			if (initialData && initialData._id) {
				await updateProduct({
					_id: initialData._id,
					data: values,
				}).unwrap();
				if (onSubmit) onSubmit(data);
			} else {
				const data = await createProduct(formData).unwrap();
				if (onSubmit) onSubmit(data);
				toast.success("Product added successfully");
			}

			// resetForm();
		} catch (error: any) {
			console.log(error);
			toast.error(error.data?.message || "Something went wrong");
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ setFieldValue }) => (
					<Form className="bg-white p-6  rounded-lg">
						<h2 className="text-2xl font-bold mb-4">
							{initialData ? "Edit Product" : "Add Product"}
						</h2>

						<div className="grid grid-cols-2 gap-5">
							<div className="">
								<div className="mb-4">
									<label className="block text-gray-700">
										Name
									</label>
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
									<label className="block text-gray-700">
										Slug
									</label>
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
									<label className="block text-gray-700">
										Meta Key
									</label>
									<Field
										name="metaKey"
										type="text"
										className="w-full px-4 py-2 border rounded-md focus:outline-none"
									/>
									<ErrorMessage
										name="metaKey"
										component="div"
										className="text-red-500"
									/>
								</div>
							</div>

							<div>
								<div className="mb-4">
									<label className="block text-gray-700">
										Discount
									</label>
									<Field
										name="discount"
										type="number"
										className="w-full px-4 py-2 border rounded-md focus:outline-none"
									/>
									<ErrorMessage
										name="discount"
										component="div"
										className="text-red-500"
									/>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700">
										In Stock
									</label>
									<Field
										name="inStock"
										type="number"
										className="w-full px-4 py-2 border rounded-md focus:outline-none"
									/>
									{/* <span className="text-gray-700">
										In Stock
									</span> */}
									<ErrorMessage
										name="inStock"
										component="div"
										className="text-red-500"
									/>
								</div>

								{initialData && (
									<div className="mb-4">
										<label className="block text-gray-700">
											Status
										</label>
										<Field
											as="select"
											name="status"
											className="w-full px-4 py-2 border rounded-md focus:outline-none">
											<option value="active">
												Active
											</option>
											<option value="inactive">
												Inactive
											</option>
										</Field>
										<ErrorMessage
											name="status"
											component="div"
											className="text-red-500"
										/>
									</div>
								)}

								<div className="mb-4">
									<label className="block text-gray-700">
										Photos
									</label>
									<input
										type="file"
										multiple
										onChange={handlePhotosChange}
										className="w-full px-4 py-2 border rounded-md focus:outline-none"
									/>
								</div>

								{!initialData && (
									<CategoryHierarchySelect
										setFieldValue={function (
											categories: any
										): void {
											let categoriess: string[] = [];
											for (const key in categories) {
												if (
													Object.prototype.hasOwnProperty.call(
														categories,
														key
													)
												) {
													const element =
														categories[key];
													if (element !== "") {
														categoriess.push(
															element
														);
													}
												}
											}

											setFieldValue(
												"categories",
												categoriess
											);
										}}
									/>
								)}

								{/* <div className="mb-4">
								<label className="block text-gray-700">
									Variants
								</label>
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
										<label className="ml-2">
											{variant.name}
										</label>
									</div>
								))}
							</div> */}
							</div>
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
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ProductForm;
