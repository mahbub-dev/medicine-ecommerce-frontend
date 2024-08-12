import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface VariantFormProps {
	initialData?: any; // Replace `any` with the correct variant type
	onSubmit?: (values: any) => void; // Accept a callback function to handle the form submission
}

const VariantForm: React.FC<VariantFormProps> = ({ initialData, onSubmit }) => {
	const initialValues = {
		name: initialData?.name || "",
		price: initialData?.price || 0,
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		price: Yup.number().required("Price is required"),
	});

	const handleSubmit = (values: any) => {
		if (onSubmit) {
			onSubmit(values); // Pass the form values to the onSubmit callback
		}
	};

	return (
		<Formik
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}
		>
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
						<button
							type="submit"
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							{initialData ? "Update Variant" : "Add Variant"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default VariantForm;
