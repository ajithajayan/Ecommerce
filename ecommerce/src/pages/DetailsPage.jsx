import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import axios from 'axios';
import Product from '../components/product/Product';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";


const DetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`https://coralperfumes.cloud6.ae/coral-api/get_product_variants/ck-beauty-sheer-for-women-eau-de-toilette-100ml/`);
                setProduct(response.data.product_data);
                setRelatedProducts(response.data.product_data.recommended_products);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div>
            {product && (
                <div>
                    <h1>{product.current_variant?.name}</h1>
                    <div>
                        <Rating
                            name='half-rating-read'
                            value={parseFloat(product.current_variant?.rating)}
                            precision={0.5}
                            readOnly
                        />
                        <span>{/* Update this line with your reviews count */} reviews</span>
                    </div>
                    <div>
                        <span>Price: {product.current_variant?.price_amount}</span>
                        <div>
                            <Button className='btn-g btn-lg'>Add To Cart</Button>
                            {/* Add your Favorite and Compare buttons here */}
                        </div>
                    </div>
                    <div>
                        {product.current_variant?.variant_images.map((imgUrl, index) => (
                            <div key={index}>
                                <InnerImageZoom zoomType='hover' zoomScale={1} src={imgUrl} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <h2>Product Details</h2>
                        <ul>
                            {product.descriptive_attributes.map((attr, index) => (
                                <li key={index}>
                                    {Object.keys(attr)[0]}: {Object.values(attr)[0]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>FAQ</h2>
                        <p>{product.faq}</p>
                    </div>
                    <div>
                        <h2>Related Products</h2>
                        <Slider>
                            {relatedProducts.map((product, index) => (
                                <Product key={index} item={product} />
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPage;
