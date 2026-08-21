export type Product = {
  id: number;
  images: string[];
  thumbnail: string;
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

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  passwordHash?: string;
  cardNumber?: number;
  expirationDate?: number;
  swish?: number;
};
