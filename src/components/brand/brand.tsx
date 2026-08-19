import { Form } from 'react-bootstrap';

export default function Brand({ products, setSelectedBrands }) {
  return (
    <>
      <Form.Label>Filter by brand</Form.Label>
      <Form>
        {[...new Set(products.map((product) => product.brand))]
          .filter((brand) => typeof brand === 'string')
          .map((brand: string) => (
            <Form.Check
              name='brand'
              key={brand}
              type='checkbox'
              id={brand}
              label={brand}
              onChange={(e) => setSelectedBrands(e.target.value)}
            />
          ))}
      </Form>
    </>
  );
}
