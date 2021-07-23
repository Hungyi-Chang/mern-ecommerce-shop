/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { login, cleanError } from '../../actions/userActions';

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const elementRef = useRef();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else if (error) {
      setShowAlert(true);
    }
  }, [history, userInfo, redirect, error, dispatch]);

  useEffect(() => {
    const divElement = elementRef.current;
    function handleClickOutside(event) {
      if (divElement && !divElement.contains(event.target)) {
        setShowAlert(false);
        dispatch(cleanError('login'));
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    setShowAlert(false);
    dispatch(login(email, password));
  };
  return (
    <div ref={elementRef}>
      <FormContainer>
        <h1>Sign In</h1>{' '}
        {showAlert && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                return setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                return setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          {' '}
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
