import React from 'react';
import PropTypes from 'prop-types';

const prefix = process.env.REACT_APP_ATTACH_PREFIX;
const Img = ({src, alt, ...rest}) => {
  return (
    <img src={`${prefix}${src}`} alt={alt} {...rest} />
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Img;
