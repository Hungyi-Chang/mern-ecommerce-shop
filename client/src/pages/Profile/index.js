/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ImCross } from 'react-icons/im';
import { IconContext } from 'react-icons';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from '../../constants/userConstants';

const Profile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const elementRef = useRef();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => {
    return state.userDetails;
  });

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const userUpdateProfile = useSelector((state) => {
    return state.userUpdateProfile;
  });

  const orderMyList = useSelector((state) => {
    return state.orderMyList;
  });

  const { success } = userUpdateProfile;

  const { userInfo } = userLogin;

  const { loading, error, user } = userDetails;

  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [history, userInfo, dispatch, user, success]);

  useEffect(() => {
    const divElement = elementRef.current;

    function handleClickOutside(event) {
      if (divElement && !divElement.contains(event.target)) {
        setShowAlert(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      dispatch({ type: USER_DETAILS_RESET });
      // Unbind the event listener on clean up
      console.log('run');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowAlert(false);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <Row ref={elementRef}>
      <Col md={3}>
        <div>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
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
              <Form.Label>New Password</Form.Label>
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
                type="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  return setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </div>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <IconContext.Provider
                          value={{
                            size: '1em',
                            color: '#FD9096',
                          }}
                        >
                          <ImCross />
                        </IconContext.Provider>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <IconContext.Provider
                          value={{
                            size: '1em',
                            color: '#FD9096',
                          }}
                        >
                          <ImCross />
                        </IconContext.Provider>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
