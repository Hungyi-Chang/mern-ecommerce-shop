/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getUserDetails,
  cleanError,
  updateUserProfile,
} from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

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

  const { success } = userUpdateProfile;

  const { userInfo } = userLogin;

  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
    // return () => {
    //   window.alert('unmount');
    // };
  }, [history, userInfo, dispatch, user, success]);

  useEffect(() => {
    const divElement = elementRef.current;

    function handleClickOutside(event) {
      if (divElement && !divElement.contains(event.target)) {
        setShowAlert(false);
        dispatch(cleanError('profile'));
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
      </Col>
    </Row>
  );
};

export default Profile;
