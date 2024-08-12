// components/ProductListByCategory.tsx
import { useGetProductsByCategoryQuery } from "@/store/productApi";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductListByCategoryProps {
  categoryId: string;
}

const ProductListByCategory: React.FC<ProductListByCategoryProps> = ({
  categoryId,
}) => {
  const { data, error, isLoading } = useGetProductsByCategoryQuery(categoryId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListByCategory;
