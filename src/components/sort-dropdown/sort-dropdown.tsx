'use client';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import styles from './sort-dropdown.module.css';

const CustomToggle = React.forwardRef<any, any>(
  ({ children, onClick }, ref) => (
    <a
      className={styles.aLink}
      href=''
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
      {children}
      &#x25bc;
    </a>
  ),
);

const CustomMenu = React.forwardRef<any, any>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}>
        <ul className='list-unstyled'>{children}</ul>
      </div>
    );
  },
);

export default function SortDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form className='px-3 py-2'>
          <Form.Check type='radio' label='Mest relevant' name='sort' />
          <Form.Check type='radio' label='Mest sålda' name='sort' />
          <Form.Check type='radio' label='Från den biligaste' name='sort' />
          <Form.Check type='radio' label='Från den dyraste' name='sort' />
          <Form.Check type='radio' label='Högsta betyg' name='sort' />
          <Form.Check type='radio' label='Nyaste' name='sort' />
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}
