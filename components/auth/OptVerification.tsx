import { useResendOtpMutation, useVerifyOtpMutation } from "@/store/apis/authApi"; // Assuming you have an OTP verification mutation
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OTPVerification = ({ userData }: any) => {
	const [otp, setOtp] = useState("");
	const [countdown, setCountdown] = useState(60);
	const [canResend, setCanResend] = useState(false);
	const [isResent, setIsResent] = useState(false);
	const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
	const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
	const router = useRouter();
	useEffect(() => {
		// Start countdown when the component mounts
		const interval = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown <= 1) {
					clearInterval(interval);
					setCanResend(true);
					return 0;
				}
				return prevCountdown - 1;
			});
		}, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [isResent]);

	const handleOtpChange = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		setOtp(e.target.value);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			const response = await verifyOtp({
				otp,
				email: userData.email, // Use the user ID from the registration response
			}).unwrap();
			if (response.success) {
				router.push("/auth/login");
				toast.success(
					"Email verified successfully. You can now log in."
				);
			}
		} catch (error: any) {
			toast.error(
				error?.data?.message ||
					"An error occurred while resending OTP. Please try again."
			);
		}
	};

	const handleResendOtp = async () => {
		try {
			await resendOtp({ email: userData.email }).unwrap(); // Unwrap the response to handle it better
			setIsResent(true);
			setOtp("");
			toast.info("OTP resent. Please check your email.");
			setCountdown(60); // Reset countdown
			setCanResend(false); // Disable resend button until countdown is finished
		} catch (error: any) {
			// Assuming error has a message property from the server
			toast.error(
				error?.data?.message ||
					"An error occurred while resending OTP. Please try again."
			);
		}
	};

	return (
		<div className="md:w-[400px] mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Verify OTP
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-gray-700">Enter OTP:</label>
					<input
						type="text"
						value={otp}
						onChange={handleOtpChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
						required
					/>
				</div>
				<button type="submit" className="btn-primary">
					{isVerifying ? "Verifying..." : "Verify OTP"}
				</button>
			</form>
			<div className="mt-4 text-center text-gray-700">
				{canResend ? (
					<button
						onClick={handleResendOtp}
						className="text-blue-500 hover:underline focus:outline-none">
						{isResending ? "Resending ..." : "Resend OTP"}
					</button>
				) : (
					<p>Resend OTP available in {countdown} seconds</p>
				)}
			</div>
		</div>
	);
};

export default OTPVerification;
