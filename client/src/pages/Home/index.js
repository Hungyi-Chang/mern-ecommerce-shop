/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Meta from '../../components/Meta';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import Message from '../../components/Message';
import { listProducts } from '../../actions/productActions';
import SearchBox from '../../components/SearchBox';
import { PRODUCT_LIST_RESET } from '../../constants/productConstants';
import ProductCarousel from '../../components/ProductCarasel';

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const { keyword } = match.params;

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => {
    return state.productList;
  });

  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));

    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <Row>
        <Col>
          <h1>Latest Product</h1>
          <SearchBox />
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword || ''} />
        </>
      )}
    </>
  );
};

export default Home;
