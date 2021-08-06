/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    setKeyword('');
  }, [history.location]);

  return (
    <Row>
      <Col md={6} className="mb-3">
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <FormControl
              type="text"
              name="q"
              value={keyword}
              onChange={(e) => {
                return setKeyword(e.target.value);
              }}
              placeholder="Search Product..."
            />
            <Button
              type="submit"
              variant="outline-secondary"
              id="button-addon2"
            >
              Button
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>

    // <Form onSubmit={submitHandler}>
    //   <Row>
    //     <Col xs={6} md={7}>
    //       <Form.Control
    //         type="text"
    //         name="q"
    //         onChange={(e) => {
    //           return setKeyword(e.target.value);
    //         }}
    //         placeholder="Search Products..."
    //       />
    //     </Col>
    //     <Col xs={1} md={3}>
    //       <Button type="submit">Search</Button>
    //     </Col>
    //   </Row>
    // </Form>
  );
};

export default SearchBox;
