import { Form } from 'react-bootstrap';
import { IoStar, IoStarOutline } from 'react-icons/io5';

export default function PriceFiltration({ setSelectedriceRange }) {
  return (
    <>
      <p>Filter by rating</p>
      <Form>
        <div className='mb-3'>
          <Form.Check
            type='radio'
            name='rating'
            value='1'
            id='price-1'
            label='>10'
            onChange={(e) => setSelectedriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='2'
            id='rating-2'
            label='10-30$'
            onChange={(e) => setSelectedriceRange(e.target.value)}
          />
          setSelectedriceRange
          <Form.Check
            type='radio'
            name='price'
            value='3'
            id='price-3'
            label='30-50$'
            onChange={(e) => setSelectedriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='4'
            id='price-4'
            label='50-80$'
            onChange={(e) => setSelectedriceRange(e.target.value)}
          />
          <Form.Check
            type='radio'
            name='price'
            value='5'
            id='price-5'
            label='<100$'
            onChange={(e) => setSelectedriceRange(e.target.value)}
          />
        </div>
      </Form>
    </>
  );
}
