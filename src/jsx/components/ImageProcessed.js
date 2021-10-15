import React from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ImageProcessed({ src, alt, imageFullpath, width, height, index, cardType }) {
  if (!imageFullpath && cardType === "imageAndText") {
    return ('');
  } else {
    return (
      <div>
        <LazyLoadImage
          key={index}
          className="card-img-top"
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

ImageProcessed.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
};
