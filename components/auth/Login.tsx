// components/Login.js
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		setLoading(true);

		try {
			const response = await axios.post("/api/login", values);

			if (response.data.success) {
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem(
					"refreshToken",
					response.data.refreshToken
				);
				toast.success("Login successful");
				// Redirect user to dashboard or home
				router.push("/dashboard"); // Change to your desired route
			} else {
				toast.error("Invalid email or password");
			}
		} catch (error) {
			toast.error("An error occurred during login.");
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	const handleRegisterClick = () => {
		router.push("/register"); // Change to your registration page route
	};

	return (
		<div className="flex md:w-[500px] items-center justify-center  ">
			<div className="max-w-md w-full bg-white p-8 border  border-gray-300 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Login
				</h2>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					{() => (
						<Form className="space-y-6">
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
							<button
								type="submit"
								disabled={loading}
								className="btn-primary">
								{loading ? "Logging in..." : "Login"}
							</button>
						</Form>
					)}
				</Formik>
				<div className="mt-4 text-center">
					<p className="text-gray-700">
						Don&apos;t have an account?{" "}
						<Link
							href={"/auth/register"}
							className="text-gray-500 hover:underline focus:outline-none">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
