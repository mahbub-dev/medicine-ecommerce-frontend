export interface Variant {
	_id?: string;
	name: string; // The name of the variant, e.g., "100mg", "200mg"
	price: number; // The price for this specific variant
	productId: string; // Reference to the product to which this variant belongs
	createdAt?: Date; // Date when the variant was created
	updatedAt?: Date; // Date when the variant was last updated
}

export interface IProduct {
	_id?: string;
	name: string;
	slug: string;
	description: string;
	photos: any;
	metaKey: string;
	price: number;
	discount: number;
	stockStatus: boolean;
	status: "active" | "inactive";
	category: string;
	variants: any[];
	createdAt?: Date; // Date when the variant was created
	updatedAt?: Date; // Date when the variant was last updated
}
