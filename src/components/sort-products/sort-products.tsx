import { Form } from 'react-bootstrap';

export default function SortProducts({ setSelectedSortOption }) {
  const sortOptions = [
    'most-relevant',
    'low-to-high',
    'high-to-low',
    'highest-rated',
  ];

  return (
    <>
      <Form.Label>Sort products by</Form.Label>
      <Form>
        <div className='mb-3'>
          {sortOptions.map((sortOption: string) => {
            const sortOptionToUpperCase =
              sortOption.charAt(0).toUpperCase() + sortOption.slice(1);
            return (
              <Form.Check
                type='radio'
                key={sortOption}
                name='sort'
                value={sortOption}
                id={sortOption}
                label={sortOptionToUpperCase}
                onChange={(e) => setSelectedSortOption(e.target.value)}
              />
            );
          })}
        </div>
      </Form>
    </>
  );
}
