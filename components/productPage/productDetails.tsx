import { addToCart, removeFromCart, selectCartItems } from "@/store/cartSlice"; // Import selectCartItems
import { useGetProductByIdQuery } from "@/store/productApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/GlobalModal";
import RelatedProduct from "./relatedProduct";
import Cart from "./shoppingCart";

const ProductDetailsPage = ({ productId }: { productId: string }) => {
	const {
		data: product,
		isLoading,
		refetch,
	} = useGetProductByIdQuery(productId);
	const [selectedVariant, setSelectedVariant] = useState(
		product?.variants[0]?._id || ""
	);
	const [quantity, setQuantity] = useState(1);
	const [isInCart, setIsInCart] = useState(false); // State to track if the item is in the cart
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems); // Selector to get cart items from the Redux store
	const [veiwCart, setViewCart] = useState(false);
	useEffect(() => {
		refetch();
	}, [refetch]);
	useEffect(() => {
		if (product) {
			// Check if the product is already in the cart
			const itemInCart = cartItems.find(
				(item) =>
					item.productId === product._id &&
					item.variantId === selectedVariant
			);
			setIsInCart(!!itemInCart);
		}
	}, [cartItems, product, selectedVariant]);

	if (isLoading) {
		return <p className="flex items-center min-screen justify-center">Loading...</p>;
	}

	if (!product) {
		return <p className="flex items-center min-screen justify-center">Product not found.</p>;
	}

	const handleVariantChange = (variantId: string) => {
		dispatch(removeFromCart(variantId));
		setSelectedVariant(variantId);
	};

	const handleAddToCart = () => {
		if (!selectedVariant) return;

		const variant = product.variants.find((v) => v._id === selectedVariant);
		if (variant) {
			dispatch(
				addToCart({
					variantName: variant?.name,
					productId: product._id as string,
					variantId: variant._id as string,
					name: product.name,
					price: variant.price,
					quantity,
					image: product.photos[0],
					maxQuantity: product.inStock,
					discount: product.discount,
				})
			);
			setIsInCart(true); // Update state to reflect the item is now in the cart
		}
	};

	const handleViewCart = () => {
		setViewCart(true);
	};

	return (
		<div className="container mx-auto py-10">
			<div className="max-w-4xl mx-auto p-4 shadow-lg border rounded">
				<div className="flex flex-col md:flex-row">
					<div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
						<Image
							width={200}
							height={200}
							src={product.photos[0]}
							alt={product.name}
							className="w-[300px] h-full object-cover rounded-lg shadow-md"
						/>
					</div>
					<div className="flex-grow">
						<h1 className="text-2xl font-bold capitalize mb-2">
							{product.name}
						</h1>
						<p className="text-gray-700 mb-2">
							{product.description}
						</p>
						<div className="mb-6">
							<p className="font-semibold  mb-2">
								Select Variant:
							</p>
							<div className="flex space-x-4">
								{product.variants.map((variant) => (
									<button
										key={variant._id}
										className={`py-2 px-4 rounded-lg border ${
											selectedVariant === variant._id
												? "bg-gray-500 text-white"
												: "bg-gray-200 text-gray-700"
										}`}
										onClick={() =>
											handleVariantChange(variant._id)
										}>
										{variant.name}
									</button>
								))}
							</div>
						</div>
						<div className="mb-6">
							<p className="text-2xl font-bold text-green-600 mb-2">
								$
								{product.variants.find(
									(v) => v._id === selectedVariant
								)?.price || 0}
							</p>
							<div className="flex items-center">
								<label className="font-semibold mr-4">
									Quantity:
								</label>
								<input
									type="number"
									min="1"
									max={product.inStock}
									value={quantity}
									onChange={(e) =>
										setQuantity(parseInt(e.target.value))
									}
									className="w-20 p-2 border rounded-lg"
								/>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							{isInCart ? (
								<button
									onClick={handleViewCart}
									className="py-3 px-6 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center">
									<FiArrowRight className="mr-2" />
									View Cart
								</button>
							) : (
								<button
									onClick={handleAddToCart}
									disabled={product.inStock <= 0}
									className={`py-3 px-6 rounded-lg flex items-center justify-center ${
										product.inStock > 0
											? "bg-gray-500 text-white hover:bg-gray-600"
											: "bg-gray-400 text-gray-700 cursor-not-allowed"
									}`}>
									{product.inStock > 0 ? (
										<>
											<FaShoppingCart className="mr-2" />
											Add to Cart
										</>
									) : (
										"Out of Stock"
									)}
								</button>
							)}
						</div>

						<Modal
							isOpen={veiwCart}
							onClose={function (): void {
								setViewCart(false);
							}}>
							<Cart
								onSubmit={() => {
									setViewCart(false);
								}}
							/>
						</Modal>
					</div>
				</div>
			</div>
			<RelatedProduct
				categories={product.categories.map((item: any) => item.slug)}
				productId={productId}
			/>
		</div>
	);
};

export default ProductDetailsPage;
