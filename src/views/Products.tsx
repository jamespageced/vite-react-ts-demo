import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGetCarList } from '@/api';
import { MainView, Spinner } from '@/components';
import { ProductsTable } from './productsChildren';
import type { ApiGetCarListResponse, Product } from '@/types';

type Data = { isLoading: boolean; isError: boolean; productList: Array<Product> };

export default function Services(): ReactComponent {
  // variables
  const [data, setData] = useState<Data>({ isLoading: true, isError: false, productList: [] });
  const {} = useQuery({
    queryKey: ['productsViewQuery'], // unique key
    queryFn: async () => handleQueryProducts()
  });

  // functions
  const handleQueryProducts = async (): Promise<null> => {
    try {
      // shows loading spinner on browser
      setData({ ...data, isLoading: true });
      // gets the data from api server
      const response: ApiGetCarListResponse = await apiGetCarList();
      // handles errors
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else if (response.data === null) {
        throw new Error('could not get cars data from server');
      }
      // deconstructs data from api (always do this, even if the types are the same)
      const productList: Array<Product> = response.data.map(prod => {
        return {
          id: prod.id,
          make: prod.make,
          model: prod.model,
          year: prod.year,
          color: prod.color,
          price: prod.price,
          image: prod.image
        };
      });
      // show products on browser
      setData({ isLoading: false, isError: false, productList });
    } catch (error: any) {
      // use proper way of displaying error here
      console.log('error:', error.message);
      // shows "Unable to load products"
      setData({ isLoading: false, isError: true, productList: [] });
    } finally {
      // querydata cannot be undefined, so we return null.
      return null;
    }
  };

  // render
  return (
    <MainView className="view-shared view-products">
      {data.isLoading ? (
        <div className="view-products-loading">
          <h2>Loading Products</h2>
          <Spinner />
        </div>
      ) : data.isError ? (
        <h2>Unable to load products</h2>
      ) : (
        <div className="view-products-table-container">
          <h2>Products</h2>
          <ProductsTable ProductList={data.productList} />
        </div>
      )}
    </MainView>
  );
}
