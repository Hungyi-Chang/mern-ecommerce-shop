/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { register, cleanError } from '../../actions/userActions';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const elementRef = useRef();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => {
    return state.userRegister;
  });

  const { loading, error, userInfo } = userRegister;

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
        dispatch(cleanError('register'));
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      dispatch(cleanError('register'));
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowAlert(false);
    if (password !== confirmPassword) {
      dispatch(cleanError(register));
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div ref={elementRef}>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {showAlert && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
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
          <Form.Group controlId="confirmPassword" className="pb-3">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                return setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          {' '}
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Register;
