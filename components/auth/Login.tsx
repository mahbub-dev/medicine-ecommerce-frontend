// components/auth/Login.js
import { useLoginMutation } from "@/store/authApi";
import { setCredentials } from "@/store/authSlice"; // Import the setCredentials action
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [login, { isLoading }] = useLoginMutation(); // RTK Query login mutation
	const dispatch = useDispatch(); // Use dispatch from Redux


	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const handleSubmit = async (
		values: { email: string; password: string },
		{ setSubmitting }: any
	) => {
		setLoading(true);

		try {
			const response = await login(values).unwrap(); // Use RTK Query mutation

			// Dispatch setCredentials action to store tokens and user data in Redux store
			dispatch(
				setCredentials({
					token: response.accessToken,
					refreshToken: response.refreshToken,
					user: response.user,
				})
			);

			toast.success("Login successful!");
			console.log(response.user);
			// Redirect based on user role
			if (response.user.role === "admin") router.push("/admin/users");
			if (response.user.role === "user") router.push("/");
		} catch (error: any) {
			// Handle errors - display error message
			toast.error(
				error?.data?.message ||
					"Invalid email or password. Please try again."
			);
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};


		return (
			<div className="flex md:w-[500px] items-center justify-center">
				<div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
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
									disabled={loading || isLoading}
									className="btn-primary">
									{loading || isLoading
										? "Logging in..."
										: "Login"}
								</button>
							</Form>
						)}
					</Formik>
					<div className="mt-4 text-center">
						<p className="text-gray-700">
							Don&apos;t have an account?{" "}
							<Link
								href="/auth/register"
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
