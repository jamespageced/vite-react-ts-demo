import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@/utils';
import type { Product } from '@/types';

interface Props {
  ProductList: Array<Product>;
}

export default function ProductsTable({ ProductList }: Props): ReactComponent {
  return (
    <table className="products-children-table">
      <thead>
        <tr>
          <th key={'image'}></th>
          <th key={'make'}>Make</th>
          <th key={'model'}>Model</th>
          <th key={'year'}>Year</th>
          <th key={'color'}>Color</th>
          <th key={'price'}>Price</th>
          <th key={'details'}></th>
        </tr>
      </thead>
      <tbody>
        {ProductList.map(prod => (
          <tr key={prod.id}>
            <td key={`image-${prod.id}`}>
              <img src={prod.image} alt="car" />
            </td>
            <td key={`make-${prod.id}`}>{prod.make}</td>
            <td key={`model-${prod.id}`}>{prod.model}</td>
            <td key={`year-${prod.id}`}>{prod.year}</td>
            <td key={`color-${prod.id}`}>{prod.color}</td>
            <td key={`price-${prod.id}`}>
              {prod.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </td>
            <td key={`details-${prod.id}`}>
              <Link to={`${routes.products}/${prod.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
