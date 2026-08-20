import { Form } from 'react-bootstrap';

export default function Brand({ products, setSelectedBrand }) {
  return (
    <>
      <Form.Label>Filter by brand</Form.Label>
      <Form>
        {[...new Set(products.map((product) => product.brand))]
          .filter((brand) => typeof brand === 'string')
          .map((brand: string) => (
            <Form.Check
              type='radio'
              key={brand}
              name='brand'
              value={brand}
              id={brand}
              label={brand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          ))}
      </Form>
    </>
  );
}
