import axios from 'axios';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default function CategoryFiltration({
  categories,
  setCategory,
  setSelectedCategory,
}) {
  useEffect(() => {
    async function getCategoryList(): Promise<void> {
      const res = await axios.get<string[]>(
        'https://dummyjson.com/products/category-list',
      );
      setCategory(res.data);
    }
    getCategoryList();
  }, []);

  return (
    <>
      {categories && (
        <>
          <p>Filter by category</p>
          <Form>
            <div className='mb-3'>
              {categories.map((category) => {
                const categoryToUpperCase =
                  category.charAt(0).toUpperCase() + category.slice(1);
                return (
                  <Form.Check
                    key={category}
                    value={category}
                    type='radio'
                    id={category}
                    name='category'
                    label={categoryToUpperCase}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                );
              })}
            </div>
          </Form>
        </>
      )}
    </>
  );
}
