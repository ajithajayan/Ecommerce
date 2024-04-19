import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-scroll';
import Loader from '../components/Loader/Loader';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get('/coral-api/get_product_variants/ck-beauty-sheer-for-women-eau-de-toilette-100ml/');
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, []);

  if (!productDetails) {
    return <Loader />;
  }

  return (
    <div className="product-detail-page">
      {/* Render product details and images here */}
      <h1>{productDetails.current_variant.name}</h1>
      <p>{productDetails.product_data.description}</p>
      {/* Render other product details */}
    </div>
  );
};

export default ProductDetails;
