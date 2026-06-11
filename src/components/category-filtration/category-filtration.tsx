import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

type Categories = string[];

export default function CategoryFiltration() {
  const [categories, setCategories] = useState<Categories>([]);

  useEffect(() => {
    async function getCategoryList(): Promise<void> {
      const res = await axios.get<Categories>(
        'https://dummyjson.com/products/category-list',
      );
      setCategories(res.data);
    }
    getCategoryList();
  }, []);

  return (
    <>
      {categories && (
        <>
          <p>Sort by category</p>
          <Form>
            <div className='mb-3'>
              {categories.map((category) => {
                const categoryToUpperCase =
                  category.charAt(0).toUpperCase() + category.slice(1);
                return (
                  <Form.Check
                    key={category}
                    type='checkbox'
                    id='category'
                    label={categoryToUpperCase}
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
