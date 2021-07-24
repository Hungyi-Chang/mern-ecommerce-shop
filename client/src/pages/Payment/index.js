/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckoutState from '../../components/CheckoutState';
import { savePaymentMethod } from '../../actions/cartActions';

const Payment = ({ history }) => {
  const cart = useSelector((state) => {
    return state.cart;
  });
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutState step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => {
                return setPaymentMethod(e.target.value);
              }}
            />
            {/* <Form.Check
            type="radio"
            label="Strip"
            id="Strip"
            name="paymentMethod"
            value="Strip"
            onChange={(e) => {
              return setPaymentMethod(e.target.value);
            }}
          /> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
