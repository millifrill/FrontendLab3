import ProductDetails from '@/components/product-details/product-details';

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  return <ProductDetails id={id} />;
}
