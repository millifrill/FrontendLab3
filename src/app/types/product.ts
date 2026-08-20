export type Product = {
  id: number;
  images: string[];
  title: string;
  sort: string;
  price: number;
  category: string;
  rating: number;
  brand: string;
  discountPercentage: number;
};

export type ProductRes = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
