import ProductForm from "@/components/admin/products/ProductForm"; // Ensure the correct path
import ProductList from "@/components/admin/products/ProductList"; // Example product list component
import Modal from "@/components/common/GlobalModal";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import VariantForm from "./VariantForm";

const inter = Inter({ subsets: ["latin"] });
const ProductManager: React.FC = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showProductForm, setShowProductForm] = useState(false);
	const [showVariantForm, setShowVariantForm] = useState(false);
	const [products, setProducts] = useState<any>({});
	const handleProductEdit = (product: any) => {
		setSelectedProduct(product);
		setShowProductForm(true);
	};

	const handleProductFormSubmit = (product: any) => {
		// Refresh product list or handle post-submit logic
		setShowProductForm(false);
		setProducts(product);
		setShowVariantForm(true);
		setSelectedProduct(null);
	};

	const handleVariantFormSubmit = () => {
		// Refresh variant list or handle post-submit logic
		setShowVariantForm(false);
	};

	return (
		<div className={`mx-auto  ${inter.className}`}>
			{/* <h1 className="text-4xl font-bold mb-8">Product Management</h1> */}
			{/* Button to toggle Add Product Form */}
			<button
				className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
				onClick={() => setShowProductForm(!showProductForm)}>
				{showProductForm ? "Cancel" : "Add Product"}
			</button>

			{/* Product List Component */}
			<ProductList
				onEdit={handleProductEdit}
				onPageChange={function (newPage: number): void {}}
			/>

			{/* Show Product Form if toggled */}
			<Modal
				isOpen={showProductForm}
				onClose={() => setShowProductForm(false)}>
				<ProductForm
					initialData={selectedProduct}
					onSubmit={handleProductFormSubmit}
					categories={[]} // Pass categories list
					variants={[]} // Pass variants list
				/>
			</Modal>

			<Modal
				isOpen={showVariantForm}
				onClose={() => setShowVariantForm(false)}>
				<VariantForm
					product={products}
					onSubmit={handleVariantFormSubmit}
				/>
			</Modal>
			{/* <VariantForm onSubmit={handleVariantFormSubmit} /> */}
		</div>
	);
};

export default ProductManager;
