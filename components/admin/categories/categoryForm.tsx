import {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} from "@/store/apis/categoryApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Inter } from "next/font/google";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const inter = Inter({ subsets: ["latin"] });

interface CategoryFormProps {
	initialData?: {
		_id?: string;
		name: string;
		slug: string;
		thumbnail: string;
		parentCategory?: string;
	};
	onSubmit?: () => void; // Optional callback after successful submission
	categories?: { _id: string; name: string; level: string }[]; // For the parentCategory dropdown
	level: "primary" | "secondary" | "tertiary"; // Level prop
	parentCategory?: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	slug: Yup.string().required("Slug is required"),
	thumbnail: Yup.string()
		.required("Thumbnail is required")
		.url("Invalid URL format"), // Ensures the thumbnail is a valid URL
});


const CategoryForm: React.FC<CategoryFormProps> = ({
	initialData,
	onSubmit,
	parentCategory,
	level = "primary",
}) => {
	// Determine whether to use the create or update mutation
	const [createCategory, { isLoading }] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();

	const handleSubmit = async (
		values: any,
		{ setSubmitting, resetForm }: any
	) => {
		try {
			if (initialData && initialData._id) {
				// Update category
				await updateCategory({
					...values,
					_id: initialData._id,
					level,
				}).unwrap();
			} else {
				// Create category
				await createCategory({
					...values,
					level,
					parentCategory,
				}).unwrap();

				toast.success("Category added successfuly");
			}
			resetForm();
			if (onSubmit) {
				onSubmit(); // Optional callback after successful submission
			}
		} catch (error: any) {
			toast.error(error.data.message || "Something went wrong");
			resetForm();
			console.error("Failed to save the category:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={{
				_id: initialData?._id || "",
				name: initialData?.name || "",
				slug: initialData?.slug || "",
				thumbnail: initialData?.thumbnail || "",
				parentCategory: initialData?.parentCategory || "",
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			{({ setFieldValue, values }) => (
				<Form
					className={`bg-white ${inter.className} shadow-md rounded-lg p-6 mt-4`}>
					<h2 className="text-2xl font-bold mb-4">
						{initialData ? "Edit Category" : "Add Category"}
					</h2>
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<Field
							name="name"
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
							required
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500 text-sm mt-1"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Slug</label>
						<Field
							name="slug"
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
							required
						/>
						<ErrorMessage
							name="slug"
							component="div"
							className="text-red-500 text-sm mt-1"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Thumbnail</label>
						<Field
							name="thumbnail"
							type="text"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
							required
						/>
						<ErrorMessage
							name="thumbnail"
							component="div"
							className="text-red-500 text-sm mt-1"
						/>
					</div>
					{/* {(level === "secondary" || level === "tertiary") && (
						<div className="mb-4">
							<label className="block text-gray-700">
								Parent Category
							</label>
							<Field
								as="select"
								name="parentCategory"
								className="w-full px-4 py-2 border rounded-md focus:outline-none"
								required>
								<option value="">Select Parent Category</option>
								{availableParentCategories.map((category) => (
									<option
										key={category._id}
										value={category._id}>
										{category.name}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="parentCategory"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
					)} */}
					<div className="flex justify-end space-x-4">
						<button
							type="submit"
							disabled={isLoading}
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							{isLoading
								? "Please wait..."
								: initialData
								? "Update Category"
								: "Add Category"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default CategoryForm;

