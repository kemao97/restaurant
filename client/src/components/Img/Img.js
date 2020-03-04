import React from 'react';
import PropTypes from 'prop-types';

const prefix = process.env.REACT_APP_ATTACH_PREFIX;
const Img = ({src, ...rest}) => {
  return (
    <img src={`${prefix}${src}`} {...rest} />
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Img;
