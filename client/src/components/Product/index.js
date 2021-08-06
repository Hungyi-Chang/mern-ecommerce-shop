/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { StateProvider } from 'reenhance-components';
import Rating from '../Rating';

const LoadedState = StateProvider(false);
const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <LazyLoad height={100} offset={[1000, 0]}>
            <LoadedState>
              {({ state: loaded, setState: setLoaded }) => {
                return (
                  <>
                    {!loaded ? (
                      <Card.Img src="/images/loadingPlaceholder.png" />
                    ) : null}
                    <Card.Img
                      variant="top"
                      src={
                        product.image
                          ? product.image.split('.')[1]
                            ? product.image
                            : `/api/photoupload/${product._id}`
                          : null
                      }
                      style={!loaded ? { visibility: 'hidden' } : {}}
                      onLoad={() => {
                        return setLoaded(true);
                      }}
                    />
                  </>
                );
              }}
            </LoadedState>
          </LazyLoad>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text className="my-3" as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
