/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  listProductDetails,
  updateProduct,
} from '../../actions/productActions';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productConstants';

const ProductEdit = ({ match, history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const [imageUri, setImageUri] = useState('');
  const [brand, setBrand] = useState('');
  const [file, setFile] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploadError, setUploadError] = useState('');

  const productId = match.params.id;

  const dispatch = useDispatch();

  const resizeFile = (uploadFile, outputType) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        uploadFile,
        640,
        510,
        'JPEG',
        90,
        0,
        (uri) => {
          setImageUri(uri);
          resolve(uri);
        },
        outputType,
        640,
        510
      );
    });
  };

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => {
    return state.productUpdate;
  });

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    }
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [productId, product, dispatch, history, successUpdate]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch]);

  const uploadFileHandler = async (e) => {
    if (e.target.files[0]) {
      await resizeFile(e.target.files[0], 'base64');
      setFile(e.target.files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
      })
    );
    if (file) {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          `/api/photoupload/${productId}`,
          formData,
          config
        );
        if (!data._id) {
          setUploadError('invalid file format');
        }
      } catch (error) {
        console.log(error);

        setUploadError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {uploadError && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="pb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  return setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => {
                  return setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => {
                  return setBrand(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => {
                  return setCategory(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => {
                  return setCountInStock(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => {
                  return setDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>

              {/* <Form.Label>Image</Form.Label>
              <Form.Control type="file" custom onChange={uploadFileHandler} />
              {uploading && <Loader />} */}

              <Form.Control
                type="file"
                onChange={uploadFileHandler}
                className="mb-3"
              />
              <Row>
                <Col sm={12} md={12} lg={12} xl={6}>
                  <Card className="mb-3 p-3 rounded">
                    <Card.Img src={imageUri || '/images/placeholder.png'} />
                  </Card>
                </Col>
              </Row>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

/* <Image src="/images/Product1.jpg" rounded /> */

export default ProductEdit;
