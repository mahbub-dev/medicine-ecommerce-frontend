// types.ts
export interface Order {
    _id: string;
    customerName: string;
    date: string; // or Date type if you're handling dates as objects
    status: "pending" | "shipped" | "delivered" | "canceled";
    totalAmount: number;
    items: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }[];
  }
  