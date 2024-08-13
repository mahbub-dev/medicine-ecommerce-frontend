import {
	useCreateVariantMutation,
	useUpdateVariantMutation,
} from "@/store/variantApi"; // Import the mutation hooks
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { IProduct } from "./types";

interface VariantFormProps {
	initialData?: any; // Replace `any` with the correct variant type
	product: IProduct; // Product ID for creating the variant
	variantId?: string; // Variant ID for updating the variant
	onSubmit?: () => void; // Accept a callback function to handle the form submission
}
const validationSchema = Yup.object({
	name: Yup.string()
		.required("Name is required") // Ensure name is provided
		.min(2, "Name must be at least 2 characters"), // Optional: You can add more specific validation rules if needed
	price: Yup.number()
		.required("Price is required") // Ensure price is provided
		.typeError("Price must be a number") // Ensures that the input is a number
		.positive("Price must be a positive number") // Ensures price is positive
		.min(1, "Price must be at least 1"), // Ensures price is at least 1
});
const VariantForm: React.FC<VariantFormProps> = ({
	initialData,
	product,
	variantId,
	onSubmit,
}) => {
	const [createVariant, { isLoading: isCreating, data: createDate }] =
		useCreateVariantMutation();
	const [updateVariant, { isLoading: isUpdating, data: updateData }] =
		useUpdateVariantMutation();

	const initialValues = {
		name: initialData?.name || "",
		price: initialData?.price || 1,
	};

	const handleSubmit = async (values: any, { resetForm }: any) => {
		try {
			if (variantId) {
				// Update existing variant
				const data = await updateVariant({
					productId: product._id,
					variantId,
					...values,
				}).unwrap();
				if (onSubmit) {
					onSubmit(); // Check if onSubmit is defined before calling it
				}
			} else {
				// Create new variant
				await createVariant({
					productId: product._id,
					...values,
				}).unwrap();
				toast.success("Variants added successfully");
			}
			resetForm();
		} catch (error: any) {
			toast.error(error.data?.message || "Something went wrong");
			console.error("Failed to submit variant", error);
		}
	};

	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}>
			{() => (
				<Form className="bg-white p-6 shadow-lg rounded-lg mt-4">
					<h2 className="text-2xl font-bold mb-4">
						{initialData ? "Edit Variant" : "Add Variant"}
					</h2>
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<Field
							type="text"
							name="name"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Price</label>
						<Field
							type="number"
							name="price"
							className="w-full px-4 py-2 border rounded-md focus:outline-none"
						/>
						<ErrorMessage
							name="price"
							component="div"
							className="text-red-500"
						/>
					</div>
					<div className="flex justify-end space-x-4">
						{createDate?.product?.variants.length > 0 && (
							<button
								disabled={isCreating}
								onClick={onSubmit}
								type="button"
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
								Done
							</button>
						)}
						<button
							disabled={isCreating || isUpdating}
							type="submit"
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							{isCreating || isUpdating
								? "Please wait..."
								: initialData
								? "Update Variant"
								: "Add Variant"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default VariantForm;
