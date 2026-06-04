import Card from '../components/product-card/product-card';
import ProductList from '../components/product-list/product-list';

export default function Page() {
  return (
    <>
      <h1 style={{ margin: '30px auto' }}>Welcome!</h1>
      <Card />
      <ProductList />
    </>
  );
}
