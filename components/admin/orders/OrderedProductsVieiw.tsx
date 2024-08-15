import Image from "next/image";
import React from "react";

interface Product {
	_id: string;
	name: string;
	slug: string;
	photos: string[];
	description: string;
	metaKey: string;
	discount: number;
	inStock: number;
	status: string;
	categories: string[];
	variants: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface CartItem {
	_id: string;
	product: Product;
	variant: any;
	quantity: number;
}

interface ProductDetailsProps {
	Products: CartItem[];
}

const OrderedProductView: React.FC<ProductDetailsProps> = ({ Products }) => {

	return (
		<div className=" mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Ordered Products</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr>
							<th className="py-3 px-4 border-b text-left">
								Image
							</th>
							<th className="py-3 px-4 border-b text-left">
								Name
							</th>
							<th className="py-3 px-4 border-b text-left">
								Description
							</th>
							<th className="py-3 px-4 border-b text-left">
								Variant
							</th>
							<th className="py-3 px-4 border-b text-left">
								Price
							</th>
							<th className="py-3 px-4 border-b text-left">
								Quantity
							</th>
						</tr>
					</thead>
					<tbody>
						{Products.map((item) => (
							<tr key={item._id} className="hover:bg-gray-100">
								<td className="py-3 px-4 border-b">
									<Image
										width={100}
										height={100}
										src={item.product.photos[0]}
										alt={item.product.name}
										className="w-20 h-20 object-cover"
									/>
								</td>
								<td className="py-3 px-4 border-b">
									{item.product.name}
								</td>
								<td className="py-3 px-4 border-b">
									{item.product.description}
								</td>
								<td className="py-3 px-4 border-b">
									{item.variant?.name}
								</td>
								<td className="py-3 px-4 border-b">
									${item.variant?.price}
								</td>
								<td className="py-3 px-4 border-b">
									{item.quantity}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderedProductView;
