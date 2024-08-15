import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Portal } from "react-portal";
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	className,
}) => {
	if (!isOpen) return null;

	return (
		<Portal>
			<div className="fixed inset-0 flex  items-center justify-center z-50">
				{/* Overlay */}
				<div
					className="fixed inset-0 bg-black opacity-50 "
					onClick={onClose}></div>

				{/* Modal Content */}
				<div
					className={`bg-white rounded-lg shadow-lg p-6 z-10    ${className}`}>
					<div className="flex justify-end">
						<button
							className="text-gray-600 hover:text-gray-900 focus:outline-none"
							onClick={onClose}>
							<RxCross1 />
						</button>
					</div>
					<div className="mt-4">{children}</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
