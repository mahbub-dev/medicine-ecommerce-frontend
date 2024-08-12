import CategoryList from "@/components/admin/categories/categoryLIst"; // Example category list component
import ProductForm from "@/components/admin/products/ProductForm"; // Ensure the correct path
import ProductList from "@/components/admin/products/ProductList"; // Example product list component
import React, { useState } from "react";

const ProductManager: React.FC = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showProductForm, setShowProductForm] = useState(false);
	const [showVariantForm, setShowVariantForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleProductEdit = (product: any) => {
		setSelectedProduct(product);
		setShowProductForm(true);
	};

	const handleVariantEdit = (variant: any) => {
		// Handle variant edit logic
		setShowVariantForm(true);
	};

	const handleProductFormSubmit = () => {
		// Refresh product list or handle post-submit logic
		setShowProductForm(false);
		setSelectedProduct(null);
	};

	const handleVariantFormSubmit = () => {
		// Refresh variant list or handle post-submit logic
		setShowVariantForm(false);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-8">Product Management</h1>

			{/* Product List Component */}
			<ProductList
				onEdit={handleProductEdit}
				products={[]}
				total={0}
				page={0}
				limit={0}
				onPageChange={function (newPage: number): void {
					throw new Error("Function not implemented.");
				}}
			/>

			{/* Show Product Form if toggled */}
			{showProductForm && (
				<ProductForm
					initialData={selectedProduct}
					onSubmit={handleProductFormSubmit}
					categories={[]} // Pass categories list
					variants={[]} // Pass variants list
				/>
			)}

			{/* Variant List Component - could be inside ProductForm */}
			{/* <VariantForm onSubmit={handleVariantFormSubmit} /> */}

			{/* You can also include the Category List here if needed */}
			<CategoryList
				categories={[]}
				refetch={function (): void {
					throw new Error("Function not implemented.");
				}}
				totalPages={0}
			/>

			{/* Button to toggle Add Product Form */}
			<button
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
				onClick={() => setShowProductForm(!showProductForm)}>
				{showProductForm ? "Cancel" : "Add Product"}
			</button>

			{/* Button to toggle Add Variant Form */}
			<button
				className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded"
				onClick={() => setShowVariantForm(!showVariantForm)}>
				{showVariantForm ? "Cancel" : "Add Variant"}
			</button>
		</div>
	);
};

export default ProductManager;
