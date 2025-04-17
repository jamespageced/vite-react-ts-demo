import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { apiGetCarDetails } from '@/api';
import { useAuthStore } from '@/stores';
import { BtnLogin, MainView, Spinner } from '@/components';
import type { ApiGetCarDetailsResponse, AuthStore, ProductDetails } from '@/types';

type Data = { isLoading: boolean; isError: boolean; product: ProductDetails | null };

export default function ProductDetails(): ReactComponent {
  // variables
  const { productId: urlParams } = useParams();
  const {
    viewerInfo: { loginMethod }
  } = useAuthStore((store: AuthStore) => store);
  const [data, setData] = useState<Data>({ isLoading: true, isError: false, product: null });
  const {} = useQuery({
    queryKey: ['productDetailsViewQuery'], // unique key
    queryFn: async () => handleQueryProductDetails()
  });

  // functions
  const handleQueryProductDetails = async (): Promise<null> => {
    try {
      // shows loading spinner on browser
      setData({ ...data, isLoading: true });
      // gets the data from api server
      const response: ApiGetCarDetailsResponse = await apiGetCarDetails(!urlParams ? 0 : Number(urlParams));
      // handles errors
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else if (response.data === null) {
        throw new Error('Car not found');
      }
      // deconstructs data from api (always do this, even if the types are the same)
      const product: ProductDetails = {
        color: response.data.color,
        engine: response.data.engine,
        features: response.data.features,
        fuelType: response.data.fuelType,
        horsepower: response.data.horsepower,
        id: response.data.id,
        image: response.data.image,
        make: response.data.make,
        mileage: response.data.mileage,
        model: response.data.model,
        owners: response.data.owners,
        price: response.data.price,
        transmission: response.data.transmission,
        year: response.data.year
      };
      // show product details on browser
      setData({ isLoading: false, isError: false, product });
    } catch (error: any) {
      // use proper way of displaying error here
      console.log('error:', error.message);
      // shows "Product Not Found"
      setData({ isLoading: false, isError: true, product: null });
    } finally {
      // querydata cannot be undefined, so we return null.
      return null;
    }
  };

  // render
  return (
    <MainView className="view-shared view-product-details">
      {data.isLoading ? (
        <div className="view-product-details-loading">
          <h2>Loading Product Details...</h2>
          <Spinner />
        </div>
      ) : data.isError ? (
        <h2>Product Not Found</h2>
      ) : data.product !== null ? (
        <div className="view-product-details-container-outer">
          <h2>
            {data.product.make} {data.product.model} - {data.product.year}
          </h2>
          <img src={data.product.image} alt="car" />
          <div className="view-product-details-container-inner">
            <p>
              <span>make:&nbsp;</span>
              {data.product.make}
            </p>
            <p>
              <span>model:&nbsp;</span>
              {data.product.model}
            </p>
            <p>
              <span>year:&nbsp;</span>
              {data.product.year}
            </p>
            <p>
              <span>color:&nbsp;</span>
              {data.product.color}
            </p>
            <p>
              <span>mileage:&nbsp;</span>
              {data.product.mileage}
            </p>
            <p>
              <span>price:&nbsp;</span>
              {data.product.price}
            </p>
            <p>
              <span>fuelType:&nbsp;</span>
              {data.product.fuelType}
            </p>
            <p>
              <span>transmission:&nbsp;</span>
              {data.product.transmission}
            </p>
            <p>
              <span>engine:&nbsp;</span>
              {data.product.engine}
            </p>
            <p>
              <span>horsepower:&nbsp;</span>
              {data.product.horsepower}
            </p>
            <p>
              <span>features:&nbsp;</span>
              {data.product.features.map((feature, index, arr) => {
                if (index === arr.length - 1) {
                  return `${feature}`;
                }
                return `${feature}, `;
              })}
            </p>
            <p>
              <span>owners:&nbsp;</span>
              {data.product.owners}
            </p>
          </div>
          {loginMethod === 'GUEST' ? (
            <BtnLogin text="LOGIN TO PURCHASE" />
          ) : (
            <button onClick={() => alert('To Do...')}>ADD&nbsp;TO&nbsp;CART</button>
          )}
        </div>
      ) : null}
    </MainView>
  );
}
