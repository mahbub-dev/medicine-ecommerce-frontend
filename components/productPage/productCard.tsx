// components/ProductCard.tsx
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: any; // Replace with your product type
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card border p-4 rounded-lg">
      <Link href={`/products/${product._id}`}>
        <a>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <h3 className="text-lg font-bold mt-2">{product.name}</h3>
          <p className="text-xl font-bold">${product.price}</p>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
