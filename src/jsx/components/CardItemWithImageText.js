import React from "react";
import PropTypes from "prop-types";
import ImageProcessed from "./ImageProcessed";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const CardItemWithImageText = ({
  id,
  path,
  title,
  link,
  imageUrl,
  imageFullpath,
  alt,
  changeHeaderBackgroudImage,
  handleDeleteGallery,
}) => {

  const link_processed = (link === "" || link === "#" || link === "/#") ? "/#" : link;

  return (
    <div className="col" key={id}>
      <div className="section-card-with-image-text-effect position-relative">
        <Link to={link_processed} onMouseEnter={changeHeaderBackgroudImage}>
          <div className="card category-item">
            <ImageProcessed src={imageUrl} alt={alt} imageFullpath={imageFullpath} cardType="imageAndText" />
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <p className="card-text" />
            </div>
          </div>
        </Link>
        <div className="card-delete position-absolute">
          <a
            href="# "
            className="link-danger"
            onClick={handleDeleteGallery}
          >
            <AiOutlineDelete size={19} />
          </a>
        </div>
      </div>
    </div>
  );
};

CardItemWithImageText.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  changeHeaderBackgroudImage: PropTypes.func,
  handleDeleteGallery: PropTypes.func,
};

CardItemWithImageText.defaultProps = {
  link: "#",
  alt: "",
};

export default CardItemWithImageText;
