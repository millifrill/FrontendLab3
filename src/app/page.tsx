import FilterSidebar from '@/components/filter-sidebar/filter-sidebar';
import ProductList from '../components/product-list/product-list';

export default function Page() {
  return (
    <>
      <h1 style={{ margin: '30px auto' }}>Welcome!</h1>

      <ProductList />
    </>
  );
}
