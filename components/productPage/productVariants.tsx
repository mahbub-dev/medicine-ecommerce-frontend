import React, { useState } from 'react';

interface ProductVariantsProps {
    variants: Array<{ _id: string; name: string; price: number; }>;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({ variants }) => {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const handleVariantChange = (variant: any) => {
        setSelectedVariant(variant);
    };

    return (
        <div className="product-variants">
            <label className="font-semibold">Select Variant:</label>
            <select onChange={(e) => handleVariantChange(variants[e.target.selectedIndex])} className="border p-2 rounded">
                {variants.map(variant => (
                    <option key={variant._id} value={variant._id}>
                        {variant.name} - ${variant.price}
                    </option>
                ))}
            </select>
            <p className="text-xl font-bold mt-4">Price: ${selectedVariant.price}</p>
        </div>
    );
};

export default ProductVariants;
