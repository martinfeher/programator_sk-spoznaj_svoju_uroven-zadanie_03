import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CardItemWithImageText from "../components/CardItemWithImageText";
import {
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
} from "../actions/galleryAction";
import { Button, Modal } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FaPlus } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { capitalizeFirstLetter } from "../../jsx/utilities/Utils";
import { config } from "../../config";

const Home = ({
  gallery: { galleryItems, loading },
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
}) => {
  useEffect(() => {
    getGalleryItems();
  });

  const title = "Fotogaléria";
  const [basicModal, setBasicModal] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [toastNotification, setToastNotification] = useState(false);

  const toggleToastNotification = () =>
    setToastNotification(!toastNotification);

  const [toastMessage, setToastMessage] = useState("");

  let galleryItemsApi = [];
  if (galleryItems) {
    if (galleryItems.galleries) {
      galleryItemsApi = galleryItems.galleries;
    } else {
      galleryItemsApi = galleryItems;
    }
  }

  // On submit a new Gallery
  const submitFormNewGallery = () => {
    if (galleryTitle === "") {
      setToastNotification(true);
      setToastMessage("Prosím vyplnte názov galérie");
    } else {
      const newGallery = {
        galleryTitle,
      };

      addGalleryItem(newGallery);
      setBasicModal(false);
      setToastNotification(true);
      setToastMessage(`Nová Galéria ${galleryTitle} bola úspešne vytvorená`);
      setGalleryTitle("");
    }
  };

  // Delete Gallery
  const handleDeleteGallery = (path, name, id) => { config.APP_ENV === "production" ? deleteGalleryItem(path) : deleteGalleryItem(id);
    getGalleryItems();
    setToastNotification(true);
    setToastMessage(`Galéria ${name} bola úspešne zmazná`);
  };

  // Update Css background
  const changeHeaderBackgroudImage = (imageUrl) => {
    if (imageUrl !== "" && typeof imageUrl === "string") {
      let backgroundVal = "linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('" + imageUrl + "')";
      document.getElementById("header").style.background = backgroundVal;
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>

      <ToastContainer className="position-fixed p-3" position="bottom-end">
        <Toast
          onClose={toggleToastNotification}
          show={toastNotification}
          animation={true}
          autohide={true}
          delay={10000}
          bg="Light"
        >
          <Toast.Header>
            <strong className="me-auto">Správa</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        className="fade modal-gallery-albums"
        show={basicModal}
        onHide={setBasicModal}
        centered
      >
        <Modal.Header>
          <h4 className="text-black">PRIDAŤ KATEGÓRIU</h4>
          <Button
            variant=""
            className="close-modal"
            onClick={() => setBasicModal(false)}
          >
            <div>
              <span className="close-mark" aria-hidden="true">
                ×{" "}
              </span>
              <span className="close-word">Zavrieť</span>
            </div>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              name="galleryTitle"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              className="modal-input pb-3"
              placeholder="ZADAJTE NÁZOV KATEGÓRIE"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="modal-button"
            onClick={submitFormNewGallery}
          >
            {" "}
            <FaPlus /> PRIDAŤ
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="gallery-albums">
        <header id="header"></header>
        <main>
          <div className="container px-5">
            <a href="/">
              <h1 className="mb-5">FOTOGALÉRIA</h1>
            </a>
            <h2>KATEGÓRIE</h2>
            <div className="mb-5">
              <hr />
            </div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-5">
              {!loading &&
                galleryItemsApi.length >= 1 &&
                galleryItemsApi.map((item, index) => {
                  return (
                    <CardItemWithImageText
                      key={index}
                      id={item.id}
                      path={item.path}
                      title={item.name ? item.name : ""}
                      link={item.link}
                      imageUrl={
                        item.image && item.image.fullpath
                          ? config.API_SERVER_URL + "/" + item.image.fullpath
                          : ""
                      }
                      alt={item.name ? capitalizeFirstLetter(item.name) : ""}
                      changeHeaderBackgroudImage={() =>
                        changeHeaderBackgroudImage(
                          item.image && item.image.fullpath
                            ? config.API_SERVER_URL + "/" + item.image.fullpath
                            : ""
                        )
                      }
                      handleDeleteGallery={() =>
                        handleDeleteGallery(item.path, item.name, item.id)
                      }
                    />
                  );
                })}
              <div className="col">
                <a href="# " onClick={() => setBasicModal(true)}>
                  <div className="card add-card">
                    <div className="card-body add-category">
                      <BiPlusCircle size={40} />
                      <h3 id="h3-add-category" className="card-title mt-2">
                        PRIDAŤ KATEGÓRIU
                      </h3>
                      <p className="card-text modal-text" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="designed-by">webdesign bart.sk</div>
          </div>
        </main>
      </div>
    </>
  );
};

Home.propTypes = {
  gallery: PropTypes.object.isRequired, // reducer
  getGalleryItems: PropTypes.func.isRequired, //action
  addGalleryItem: PropTypes.func.isRequired, //action
  deleteGalleryItem: PropTypes.func.isRequired, //action
};

const mapStateToProps = (state) => ({
  gallery: state.gallery,
});

export default connect(mapStateToProps, {
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
})(Home);
