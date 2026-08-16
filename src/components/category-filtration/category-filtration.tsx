import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function CategoryFiltration({ setSelectedCategory }) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function getCategoryList(): Promise<void> {
      const res = await axios.get<string[]>(
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
          <p>Filter by category</p>
          <Form>
            <div className='mb-3'>
              {categories.map((category: string) => {
                const categoryToUpperCase =
                  category.charAt(0).toUpperCase() + category.slice(1);
                return (
                  <Form.Check
                    type='radio'
                    key={category}
                    name='category'
                    value={category}
                    id={category}
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
