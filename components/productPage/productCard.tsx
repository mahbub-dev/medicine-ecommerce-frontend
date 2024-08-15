// components/ProductCard.tsx
import placeholderImage from '@/public/300x150.svg';
import Image from "next/image";
import { useRouter } from "next/router";
const ProductCard: React.FC<{ product: any }> = ({ product }) => {
	const { name, photos, description, categories, variants } = product;
	const router = useRouter();
	return (
		<div
			onClick={() => router.push(`/products/${product._id}`)}
			className="bg-white rounded-lg w-[300px]  cursor-pointer shadow-lg overflow-hidden">
			<div className="relative">
				<Image
					src={product.photos[0]||placeholderImage}
					alt={name}
					width={100}
					height={100}
					className="w-full h-[150px] object-cover"
				/>
			</div>
			<div className="p-6">
				<h2 className="text-2xl font-bold text-gray-800">{name}</h2>
				<p className="text-gray-600 mt-2">{description}</p>
				{/* <div className="mt-4">
					<h3 className="text-lg font-semibold text-gray-800">
						Categories:
					</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{categories.map((category: any) => (
							<span
								key={category?._id as string}
								className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
								{category?.name as string}
							</span>
						))}
					</div>
				</div> */}
				<div className="mt-4">
					<h3 className="text-lg font-semibold text-gray-800">
						Variants:
					</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{variants.map((variant: any) => (
							<span
								key={variant._id}
								className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
								{variant.name} - ${variant.price}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
