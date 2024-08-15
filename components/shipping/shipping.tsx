import { clearCart } from "@/store/cartSlice";
import { useCreateOrderMutation } from "@/store/orderApi";
import {
	useCreateShippingAddressMutation,
	useDeleteShippingAddressMutation,
	useGetShippingAddressesQuery,
	useUpdateShippingAddressMutation,
} from "@/store/shippingApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import locations from "./addresses.json";

// Validation schema for the shipping form fields
const validationSchema = Yup.object({
	division: Yup.string().required("Division is required"),
	district: Yup.string().required("District is required"),
	subDistrict: Yup.string().required("Sub-District is required"),
	address: Yup.string().required("Address is required"),
	name: Yup.string().required("Name is required"),
	phone: Yup.string()
		.required("Phone is required")
		.matches(/^\d{11}$/, "Phone number must be 11 digits"),
});

interface ShippingFormProps {
	initialData?: any; // Initial data for the form, if editing an existing address
	onSubmit?: (data: any) => void; // Optional callback when the form is submitted
}

const ShippingForm: React.FC<ShippingFormProps> = ({
	initialData,
	onSubmit,
}) => {
	// Mutations for creating, updating, and deleting shipping addresses
	const [createShippingAddress, { isLoading }] =
		useCreateShippingAddressMutation();
	const [updateShippingAddress, { isLoading: isUpdating }] =
		useUpdateShippingAddressMutation();
	const [deleteShippingAddress, { isLoading: isDeleting }] =
		useDeleteShippingAddressMutation();

	// Query to fetch existing shipping addresses
	const { data: existingAddresses, refetch } = useGetShippingAddressesQuery();
	
	// Mutation for creating an order
	const [createOrder, { isLoading: creatingOrder }] =
		useCreateOrderMutation();

	// State to store division, district, and sub-district options
	const [divisionOptions, setDivisionOptions] = useState<any[]>([]);
	const [districtOptions, setDistrictOptions] = useState<any[]>([]);
	const [subDistrictOptions, setSubDistrictOptions] = useState<any[]>([]);

	// State to track the selected address ID
	const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
		null
	);

	// State to track if the order has been confirmed
	const [isOrderConfirm, setIsOrderConfirm] = useState(false);

	useEffect(() => {
		// Initialize division options on component mount
		setDivisionOptions(locations.divisions);
	}, []);

	useEffect(() => {
		// Refetch shipping addresses when the component mounts
		refetch();
	}, [refetch]);

	useEffect(() => {
		// Set the selected address ID if `initialData` is provided (for editing)
		if (initialData) {
			setSelectedAddressId(initialData._id);
		}
	}, [initialData]);

	const handleDivisionChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		setFieldValue: any
	) => {
		const selectedDivision = event.target.value;
		const districts =
			locations.divisions.find(
				(division) => division.name === selectedDivision
			)?.districts || [];
		setDistrictOptions(districts);
		setSubDistrictOptions([]);
		setFieldValue("division", selectedDivision);
		setFieldValue("district", "");
		setFieldValue("subDistrict", "");
	};

	const handleDistrictChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		setFieldValue: any
	) => {
		const selectedDistrict = event.target.value;
		const subDistricts =
			districtOptions.find(
				(district) => district.name === selectedDistrict
			)?.subDistricts || [];
		setSubDistrictOptions(subDistricts);
		setFieldValue("district", selectedDistrict);
		setFieldValue("subDistrict", "");
	};

	// Handle the selection of an existing address and populate the form fields with its data
	const handleAddressSelection = (
		selectedAddress: any,
		setFieldValue: any
	) => {
		const selectedDivision = selectedAddress.division;
		const selectedDistrict = selectedAddress.district;

		setSelectedAddressId(selectedAddress._id); // Track the selected address ID

		// Update the form fields
		setFieldValue("division", selectedDivision);
		setFieldValue("district", selectedDistrict);
		setFieldValue("subDistrict", selectedAddress.subDistrict);
		setFieldValue("address", selectedAddress.address);
		setFieldValue("name", selectedAddress.name);
		setFieldValue("phone", selectedAddress.phone);

		// Set the district options based on the selected division
		const districts =
			locations.divisions.find(
				(division) => division.name === selectedDivision
			)?.districts || [];
		setDistrictOptions(districts);

		// Set the sub-district options based on the selected district
		const subDistricts =
			districts.find((district) => district.name === selectedDistrict)
				?.subDistricts || [];
		setSubDistrictOptions(subDistricts);
	};

	// Initial form values, using `initialData` if provided
	const initialValues = {
		division: initialData?.division || "",
		district: initialData?.district || "",
		subDistrict: initialData?.subDistrict || "",
		address: initialData?.address || "",
		name: initialData?.name || "",
		phone: initialData?.phone || "",
		existingAddress: "", // Field for handling existing address selection
	};

	const dispatch = useDispatch();
	const cart = useSelector((state: any) => state.cart);
	const router = useRouter();

	// Handle order confirmation after the shipping address is selected or created
	const handleOrderConfirm = async (shippingAddress: string) => {
		try {
			const products = cart.items.map((item: any) => ({
				product: item.productId,
				variant: item.variantId,
				quantity: item.quantity,
			}));

			const newOrder = {
				shippingAddress,
				totalDiscount: cart.discount,
				products: products,
				totalPrice: cart.totalPrice,
				shippingCost: cart.shipping,
			};
			await createOrder(newOrder);
			dispatch(clearCart()); // Clear the cart after the order is confirmed
			setIsOrderConfirm(true);

			router.push("/order-confirmed"); // Redirect to the order confirmation page
		} catch (error: any) {
			console.error(error);
			toast.error(error.data?.message || "Something went wrong");
		}
	};

	// Handle form submission for creating or updating a shipping address
	const handleSubmit = async (values: any, { resetForm }: any) => {
		try {
			let shippingId: string;
			if (selectedAddressId) {
				// Update the existing address
				await updateShippingAddress({
					id: selectedAddressId,
					updates: values,
				}).unwrap();
				if (onSubmit) onSubmit(values);
				shippingId = selectedAddressId;
			} else {
				// Create a new address
				const data = await createShippingAddress(values).unwrap();
				shippingId = data.shippingAddress._id;
				if (onSubmit) onSubmit(data);
			}

			if (cart.items.length === 0) {
				toast.info("Shipping Address Saved");
				resetForm();
				setSelectedAddressId(null);
				return toast.error("Your cart is empty");
			}
			await handleOrderConfirm(shippingId);
			resetForm();
			setSelectedAddressId(null); // Reset selection after submission
		} catch (error: any) {
			console.error(error);
			toast.error(error.data?.message || "Something went wrong");
		}
	};

	// Handle the deletion of the selected shipping address
	const handleDelete = async (resetForm: any) => {
		try {
			if (selectedAddressId) {
				await deleteShippingAddress({
					id: selectedAddressId,
				}).unwrap();
				resetForm(); // Reset the form after deletion
				setSelectedAddressId(null);
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.data?.message || "Something went wrong");
		}
	};

	// Redirect to the homepage if the cart is empty and the order hasn't been confirmed
	// useEffect(() => {
	// 	if (!creatingOrder && !isOrderConfirm && cart.items.length === 0) {
	// 		router.push("/");
	// 	}
	// }, [cart, creatingOrder, isOrderConfirm, router]);

	if (creatingOrder) {
		return (
			<p className="flex items-center justify-center min-h-screen">
				Confirming Order
			</p>
		);
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
			{({ setFieldValue, resetForm }) => (
				<Form className="bg-white p-6 rounded-lg">
					<h2 className="text-2xl font-bold mb-4">
						{initialData
							? "Edit Shipping Address"
							: "Add Shipping Address"}
					</h2>

					{/* Address Selection Dropdown */}
					<div className="mb-4">
						<label className="block text-gray-700">
							Existing Addresses
						</label>
						<Field
							as="select"
							name="existingAddress"
							onChange={(
								e: React.ChangeEvent<HTMLSelectElement>
							) => {
								const selectedAddress = existingAddresses?.find(
									(address: any) =>
										address._id === e.target.value
								);
								if (selectedAddress) {
									handleAddressSelection(
										selectedAddress,
										setFieldValue
									);
								}
							}}
							className="w-full px-4 py-2 border rounded-md focus:outline-none">
							<option value="">Select Address</option>
							{existingAddresses?.map((address: any) => (
								<option key={address._id} value={address._id}>
									{address.address}{" "}
									{/* Adjust this based on how you want to display the address */}
								</option>
							))}
						</Field>
						<ErrorMessage
							name="existingAddress"
							component="div"
							className="text-red-500"
						/>
					</div>

					{/* Division, District, Sub-District, Address, Name, Phone */}
					<div className="grid grid-cols-2 gap-5">
						<div className="mb-4">
							<label className="block text-gray-700">
								Division
							</label>
							<Field
								as="select"
								name="division"
								onChange={(
									e: React.ChangeEvent<HTMLSelectElement>
								) => handleDivisionChange(e, setFieldValue)}
								className="w-full px-4 py-2 border rounded-md focus:outline-none">
								<option value="">Select Division</option>
								{divisionOptions.map((division: any) => (
									<option
										key={division.id}
										value={division.name}>
										{division.name}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="division"
								component="div"
								className="text-red-500"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700">
								District
							</label>
							<Field
								as="select"
								name="district"
								onChange={(
									e: React.ChangeEvent<HTMLSelectElement>
								) => handleDistrictChange(e, setFieldValue)}
								className="w-full px-4 py-2 border rounded-md focus:outline-none">
								<option value="">Select District</option>
								{districtOptions.map((district: any) => (
									<option
										key={district.id}
										value={district.name}>
										{district.name}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="district"
								component="div"
								className="text-red-500"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700">
								Sub-District
							</label>
							<Field
								as="select"
								name="subDistrict"
								className="w-full px-4 py-2 border rounded-md focus:outline-none">
								<option value="">Select Sub-District</option>
								{subDistrictOptions.map(
									(subDistrict: any, index: number) => (
										<option key={index} value={subDistrict}>
											{subDistrict}
										</option>
									)
								)}
							</Field>
							<ErrorMessage
								name="subDistrict"
								component="div"
								className="text-red-500"
							/>
						</div>

						<div className="mb-4 col-span-2">
							<label className="block text-gray-700">
								Address
							</label>
							<Field
								name="address"
								as="textarea"
								className="w-full px-4 py-2 border rounded-md focus:outline-none"
							/>
							<ErrorMessage
								name="address"
								component="div"
								className="text-red-500"
							/>
						</div>

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
							<label className="block text-gray-700">Phone</label>
							<Field
								name="phone"
								type="text"
								className="w-full px-4 py-2 border rounded-md focus:outline-none"
							/>
							<ErrorMessage
								name="phone"
								component="div"
								className="text-red-500"
							/>
						</div>
					</div>

					<div className="flex justify-end space-x-4">
						{selectedAddressId && (
							<button
								type="button"
								onClick={() => handleDelete(resetForm)}
								disabled={isDeleting}
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
								{isLoading ? "Please wait..." : "Delete"}
							</button>
						)}
						<button
							type="submit"
							disabled={isLoading || isUpdating}
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							{isLoading
								? "Please wait..."
								: "Save and Confirm Order"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ShippingForm;
