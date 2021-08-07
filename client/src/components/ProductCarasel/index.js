/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import Message from '../Message';
import Loader from '../Loader';
import { listTopProducts } from '../../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => {
    return state.productTopRated;
  });

  const { loading, error, products } = productTopRated;

  const style = {
    image: {
      height: '300px',
      display: 'block',
      margin: '50px auto',
      padding: '25px',
      borderRadius: '50%',
    },
    mobileImage: {
      height: '300px',
      display: 'block',
      margin: '30px auto',
      padding: '40px',
      borderRadius: '50%',
    },
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark my-3">
      {products.map((product) => {
        return (
          <Carousel.Item key={product._id} style={style.carousel}>
            <Link to={`/product/${product._id}`}>
              {isMobile ? (
                <>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={style.mobileImage}
                  />
                  <Carousel.Caption>
                    <h2>${product.price}</h2>
                  </Carousel.Caption>
                </>
              ) : (
                <>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={style.image}
                  />
                  <Carousel.Caption>
                    <h2>
                      {product.name}(${product.price})
                    </h2>
                  </Carousel.Caption>
                </>
              )}
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ProductCarousel;
