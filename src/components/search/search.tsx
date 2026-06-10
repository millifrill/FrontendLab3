'use client';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  return (
    <Form>
      <Form.Control
        type='text'
        placeholder='Sök...'
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Form>
  );
}
