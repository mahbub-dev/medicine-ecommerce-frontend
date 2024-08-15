import Modal from "@/components/common/GlobalModal";
import { useGetProductByIdQuery } from "@/store/apis/productApi";
import { useDeleteVariantMutation } from "@/store/apis/variantApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import the edit and delete icons from Font Awesome
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import VariantForm from "./VariantForm";

interface ProductDetailProps {
	productId: string;
	onUpdate?: () => void; // Optional callback after updating the product
}

const ProductDetail: React.FC<ProductDetailProps> = ({
	productId,
	onUpdate,
}) => {
	const {
		data: product,
		isLoading,
		error,
		refetch,
	} = useGetProductByIdQuery(productId);
	const [deleteVariant, { isLoading: isDeletingVariant }] =
		useDeleteVariantMutation();
	const [viewUpdateProductForm, setViewUpdateProductForm] = useState(false);
	const [viewVariantEdit, setViewVariantEdit] = useState(false);
	const [variant, setVariatnt] = useState<any>(null);
	const [veiwAddVariant, setViewAddVariant] = useState(false);
	const handleDeleteVariant = async (variantId: string) => {
		try {
			await deleteVariant({ variantId });
			toast.success("Variant deleted");
			refetch();
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	useEffect(() => {
		refetch();
	}, [refetch]);
	if (isLoading) return <div className="flex items-center min-h-screen justify-center">Loading...</div>;
	if (error || !product) return <div>404 not found</div>;
	const handleEditVariant = (variant: any) => {
		setViewVariantEdit(true);
		setVariatnt(variant);
	};
	return (
		<div className="bg-white p-8 shadow-lg rounded-lg mt-4">
			<h1 className="text-3xl font-bold mb-6">{product.name}</h1>

			{/* Product Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<div className="flex items-center gap-5">
						<h2 className="text-xl font-semibold mb-4">
							Product Information
						</h2>
						<button
							className="text-blue-500 hover:text-blue-700"
							onClick={() => setViewUpdateProductForm(true)}>
							<FaEdit />
						</button>
					</div>
					<p>
						<span className="font-semibold">Slug:</span>{" "}
						{product.slug}
					</p>
					<p className="max-w-[500px]">
						<span className="font-semibold">Description:</span>{" "}
						{product.description}
					</p>
					<p>
						<span className="font-semibold">Meta Key:</span>{" "}
						{product.metaKey}
					</p>
					<p>
						<span className="font-semibold">Price:</span> $
						{product.variants[0]?.price}
					</p>
					<p>
						<span className="font-semibold">Status:</span>{" "}
						{product.status}
					</p>
					<p>
						<span className="font-semibold">Stock:</span>{" "}
						{product.inStock > 0 ? product.inStock : "Out of Stock"}
					</p>
					<p>
						<span className="font-semibold">Discount:</span>{" "}
						{product.discount}%
					</p>
				</div>

				{/* Product Images */}
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Product Images
					</h2>
					<div className="flex flex-wrap">
						{product.photos.map((photo: string, index: number) => (
							<Image
								key={index}
								width={150}
								height={150}
								src={photo}
								alt={product.name}
								className="mr-2 mb-2 border rounded-md"
							/>
						))}
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">Categories</h2>
				<div className="flex items-center gap-5">
					{product.categories.map((category: any) => (
						<div
							key={category._id}
							className="mb-2 shadow-lg border border-1 border-gray-100 rounded p-4">
							<Image
								width={50}
								height={50}
								src={`http://localhost:5000/uploads/${category.thumbnail}`}
								alt={category.name}
								className="mt-2 border rounded-md"
							/>
							<p>
								<span className="font-semibold">Name:</span>{" "}
								{category?.name}
							</p>
							<p>
								<span className="font-semibold">Slug:</span>{" "}
								{category?.slug}
							</p>
							<p className="capitalize">
								<span className="font-semibold ">Level:</span>{" "}
								{category?.level}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Variants */}
			<div className="mt-8">
				<div className="flex mb-4 items-center gap-10 ">
					<h2 className="text-xl font-semibold ">Variants</h2>
					<button
						className="px-2 py-1 rounded bg-gray-500 text-white font-semibold"
						onClick={() => setViewAddVariant(true)}>
						Add New Variants
					</button>
				</div>
				<div className="flex gap-4">
					{" "}
					{product.variants.map((variant: any) => (
						<div
							key={variant._id}
							className="mb-2  max-w-[200px] shadow-lg border border-1 border-gray-100 rounded p-4 justify-between">
							<div className="">
								<p>
									<span className="font-semibold">Name:</span>{" "}
									{variant.name}
								</p>
								<p>
									<span className="font-semibold">
										Price:
									</span>{" "}
									${variant.price}
								</p>
							</div>
							<div className="flex mt-3  gap-4 items-center ">
								<button
									className="text-blue-500 hover:text-blue-700"
									onClick={() => handleEditVariant(variant)}>
									<FaEdit />
								</button>
								<button
									disabled={isDeletingVariant}
									className="text-red-500 hover:text-red-700"
									onClick={() =>
										handleDeleteVariant(variant._id)
									}>
									<FaTrash />
								</button>
							</div>
						</div>
					))}
				</div>

				<Modal
					isOpen={veiwAddVariant}
					onClose={function (): void {
						setViewAddVariant(false);
					}}>
					<VariantForm
						product={product}
						onSubmit={() => {
							setViewAddVariant(false);
							refetch();
						}}
					/>
				</Modal>
				<Modal
					isOpen={viewVariantEdit}
					onClose={function (): void {
						setViewVariantEdit(false);
					}}>
					<VariantForm
						product={product}
						variantId={variant?._id}
						initialData={variant}
						onSubmit={() => {
							setViewVariantEdit(false);
							refetch();
						}}
					/>
				</Modal>
				<Modal
					isOpen={viewUpdateProductForm}
					onClose={function (): void {
						setViewUpdateProductForm(false);
					}}>
					<ProductForm
						categories={[]}
						variants={[]}
						initialData={product}
						onSubmit={() => {
							setViewUpdateProductForm(false);
							refetch();
						}}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default ProductDetail;
