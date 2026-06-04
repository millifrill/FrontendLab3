import Card from '../../src/components/card/card';
import FilterSidebar from '../components/filter-sidebar/filter-sidebar';

export default function Page() {
  return (
    <>
      <h1 style={{ margin: '30px auto' }}>Welcome!</h1>
      <FilterSidebar />
      <Card />
    </>
  );
}
