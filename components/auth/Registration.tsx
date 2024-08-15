// components/auth/Registration.js
import { useRegisterMutation } from "@/store/apis/authApi"; // Updated import
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import OTPVerification from "./OptVerification";

const Registration = () => {
	const [loading, setLoading] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [userData, setUserData] = useState();
	const [register] = useRegisterMutation();


	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.email("Invalid email")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters long")
			.required("Password is required"),
		photo: Yup.mixed().required("Photo is required"),
	});

	const handleSubmit = async (
		values: { [x: string]: string | Blob },
		{ setSubmitting }: any
	) => {
		setLoading(true);

		try {
			const formDataToSend = new FormData();
			Object.keys(values).forEach((key) => {
				formDataToSend.append(key, values[key]);
			});

			const response = await register(formDataToSend).unwrap();

			if (response.user) {
				setOtpSent(true);
				setUserData(response.user);
				toast.success(
					"OTP sent to your email. Please verify your email."
				);
			} else {
				toast.error("Registration failed. Please try again.");
			}
		} catch (error:any) {
			console.log(error)
			toast.error(error?.data?.message ||error?.data?.error ||"An error occurred during registration.");
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	if (otpSent && userData) {
		// Show OTP Verification form after successful registration
		return <OTPVerification userData={userData} />;
	}

	return (
		<div className="md:w-[500px] mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Register
			</h2>
			<Formik
				initialValues={{ name: "", email: "", password: "", photo: "" }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ setFieldValue }) => (
					<Form className="space-y-6">
						<div>
							<label className="block text-gray-700">Name:</label>
							<Field
								name="name"
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
							<ErrorMessage
								name="name"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Email:
							</label>
							<Field
								name="email"
								type="email"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Password:
							</label>
							<Field
								name="password"
								type="password"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Photo:
							</label>
							<input
								name="photo"
								type="file"
								accept="image/*"
								onChange={(e) =>
									setFieldValue(
										"photo",
										e.currentTarget.files
											? e.currentTarget.files[0]
											: null
									)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
							/>
							<ErrorMessage
								name="photo"
								component="div"
								className="text-red-500 text-sm mt-1"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="btn-primary">
							{loading ? "Registering..." : "Register"}
						</button>
					</Form>
				)}
			</Formik>
			<div className="mt-4 text-center">
				<p className="text-gray-700">
					Already have an account?{" "}
					<Link
						href={"/auth/login"}
						className="text-gray-500 hover:underline focus:outline-none">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;
