import React from "react";
import PropTypes from "prop-types";
import ImageProcessed from "./ImageProcessed";

export default function CardItemWithImage({ src, alt, handleClickImage, index, width, height }) {
  return (
    <>
      <div className="col" key={index}>
        <a
          href="# "
          onClick={() => {
            handleClickImage(index);
          }}
        >
          <div className="card item-image">
            <ImageProcessed src={src} alt={alt} width={width} height={height} index={index} cardType="image" />
          </div>
        </a>
      </div>
    </>
  );
}

CardItemWithImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  handleClickImage: PropTypes.func,
  index: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
