import { Form } from 'react-bootstrap';

export default function PriceFiltration({ setSelectedPriceRange }) {
  return (
    <>
      <Form.Label>Filter by price range</Form.Label>
      <Form>
        <div className='mb-3'>
          <Form.Check
            type='radio'
            name='price'
            value='1'
            id='price-1'
            label='<10'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='2'
            id='rating-2'
            label='10-30$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='3'
            id='price-3'
            label='30-50$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='4'
            id='price-4'
            label='50-80$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='5'
            id='price-5'
            label='80-100$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='6'
            id='price-6'
            label='100$-1000$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='7'
            id='price-7'
            label='>1000$'
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          />
        </div>
      </Form>
    </>
  );
}
