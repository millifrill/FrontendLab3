export type Product = {
  id: number;
  images: string[];
  thumbnail: string;
  title: string;
  brand: string;
  price: number;
  rating: number;
  discountPercentage: number;
};

export type ProductRes = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
