export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaData;
  images: string[];
  thumbnail: string;
}
export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO format date
  reviewerName: string;
  reviewerEmail: string;
}

export interface MetaData {
  createdAt: string; // ISO format date
  updatedAt: string; // ISO format date
  barcode: string;
  qrCode: string;
}
