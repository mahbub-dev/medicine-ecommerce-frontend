import Image from "next/image";
import React, { useState } from "react";
import ProductForm from "./ProductForm"; // Import the form component
import { IProduct } from "./types"; // Import necessary types

interface ProductDetailProps {
	product: IProduct;
	onUpdate: () => void; // Optional callback after updating the product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className="bg-white p-6 shadow-lg rounded-lg mt-4">
			<h2 className="text-2xl font-bold mb-4">{product.name}</h2>
			<p>Slug: {product.slug}</p>
			<p>Price: ${product.price}</p>
			<p>Status: {product.status}</p>
			<p>
				Stock Status:{" "}
				{product.stockStatus ? "In Stock" : "Out of Stock"}
			</p>
			<p>Discount: {product.discount}%</p>
			<div className="my-4">
				{product.photos.map((photo: any) => (
					<Image
						key={photo}
						width={100}
						height={100}
						src={photo}
						alt={product.name}
						className="inline-block mr-2"
					/>
				))}
			</div>
			<button
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? "Cancel" : "Edit Product"}
			</button>

			{isEditing && (
				<div className="mt-6">
					<ProductForm
						initialData={product}
						onSubmit={() => {
							setIsEditing(false);
							if (onUpdate) onUpdate();
						}}
						categories={[]} // Pass in categories
						variants={[]} // Pass in variants
					/>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
