// components/ProductDetail.tsx
import { useAddToCartMutation } from "@/store/cartApi";
import { useGetProductByIdQuery } from "@/store/productApi";
import { useRouter } from "next/router";
import React from "react";
import RelatedProducts from "./RelatedProducts";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useGetProductByIdQuery(id as string);
  const [addToCart] = useAddToCartMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: data._id, quantity: 1 }).unwrap();
      // handle success (e.g., show a notification)
    } catch (error) {
      // handle error (e.g., show a notification)
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-info">
        <img src={data.thumbnail} alt={data.name} className="product-image" />
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-xl">{data.description}</p>
        <p className="text-xl font-bold">${data.price}</p>
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Add to Cart
        </button>
      </div>
      <RelatedProducts productId={data._id} />
    </div>
  );
};

export default ProductDetail;
