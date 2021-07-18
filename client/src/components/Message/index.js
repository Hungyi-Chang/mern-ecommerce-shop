import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = { variant: 'info' };

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Message;
