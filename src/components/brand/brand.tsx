import { Form } from 'react-bootstrap';
import { useState } from 'react';

export default function Brand({ products }) {
  return (
    <Form>
      {[...new Set(products.map((product) => product.brand))]
        .filter((brand) => typeof brand === 'string')
        .map((brand: string) => (
          <Form.Check key={brand} type='checkbox' id={brand} label={brand} />
        ))}
    </Form>
  );
}
