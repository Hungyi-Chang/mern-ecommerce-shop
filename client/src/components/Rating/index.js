import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Span, SpanStar } from './RatingElements';

const Rating = ({ value, text }) => {
  const [rating, setRating] = useState({
    integerVal: '',
    decimalVal: '',
    remainderVal: '',
  });

  useEffect(() => {
    const integer = Math.floor(value);
    const decimal = value - integer > 0;
    const remainder = 5 - value;
    const numObj = {
      integerVal: integer,
      decimalVal: decimal,
      remainderVal: remainder,
    };
    setRating(numObj);
  }, [value]);

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= rating.integerVal; i += 1) {
      stars.push(
        <SpanStar key={`${text}${i}fill`}>
          <BsStarFill />
        </SpanStar>
      );
    }
    if (rating.decimalVal) {
      stars.push(
        <SpanStar key={text}>
          <BsStarHalf />
        </SpanStar>
      );
    }
    for (let i = 1; i <= rating.remainderVal; i += 1) {
      stars.push(
        <SpanStar key={`${text}${i}`}>
          <BsStar />
        </SpanStar>
      );
    }

    return stars;
  };

  return (
    <div className="rating">
      <IconContext.Provider
        value={{ color: '#f8e825', className: 'react-star' }}
      >
        {renderRating()}
        <Span>{text && text} </Span>
      </IconContext.Provider>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default Rating;
