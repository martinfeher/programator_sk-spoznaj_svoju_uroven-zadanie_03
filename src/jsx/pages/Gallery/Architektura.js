import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PhotoSwipe } from "react-photoswipe";
import CardItemWithImage from "../../components/CardItemWithImage";
import { Button, Modal } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { FaCamera, FaPlus } from "react-icons/fa";
import { imagesArchitektura } from "../../data/ArchitekturaData"; // json data source, data images
import { Link } from "react-router-dom";

export default function Architektura() {

  const title = "Architektúra Fotogaléria";
  const [basicModal, setBasicModal] = useState(false);

  // Split data initially for each image row
  const imagesArchitekturaLghtboxItems = imagesArchitektura.slice(0, 100);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItemIndex, setLightboxItemIndex] = useState(0);

  const lightboxOptions = {
    index: lightboxItemIndex,
    bgOpacity: 0.75,
    barsSize: { top: 44, bottom: "auto" },
    fullscreenEl: false,
    shareEl: false,
    zoomEl: false,
    allowPanToNext: true,
    pinchToClose: true,
  };

  const handleClickImage = (index) => {
    setLightboxOpen(true);
    setLightboxItemIndex(index);
  };

  return (
    <>
      <div className="gallery-architektura">
        <header></header>
        <main>
          <div className="container px-5">
            <Link to="/">
              <h1 className="mb-5">FOTOGALÉRIA</h1>
            </Link>
            <h2>
              <Link to="/">
                <BsArrowLeft size={26} className="fa-arrow-left" />
              </Link>{" "}
              &nbsp;ARCHITEKTÚRA
            </h2>
            <div className="mb-5">
              <hr />
            </div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-5">
              {imagesArchitektura.map((item, index) => {
                return (
                  <CardItemWithImage
                    src={item.src}
                    alt={item.title}
                    handleClickImage={handleClickImage}
                    index={index}
                    width={item.w}
                    height={item.h}
                  />
                );
              })}
              <div className="col" key={imagesArchitektura.length+1}>
                <a href="# " onClick={() => setBasicModal(true)}>
                  <div className="card add-card">
                    <div className="card-body add-photo">
                      <FaPlus size={18} className="fas fa-plus" />
                      <FaCamera size={36} className="fas fa-camera fa-2x" />
                      <p className="card-text modal-text">PRIDAŤ FOTKY</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="designed-by">webdesign bart.sk</div>
          </div>
        </main>
        <footer />
      </div>

      <HelmetProvider> 
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider> 

      <PhotoSwipe
        isOpen={lightboxOpen}
        items={imagesArchitekturaLghtboxItems}
        options={lightboxOptions}
        onClose={() => setLightboxOpen(false)}
      />

      <Modal
        className="fade modal-gallery-architektura p-2"
        show={basicModal}
        onHide={() => setBasicModal}
        centered
      >
        <div className="modal-content border-0 px-3 py-2">
          <Modal.Header>
            <h5 className="modal-title" id="add-new-photoLabel">
              PRIDAŤ FOTKY
            </h5>
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
            <div className="add-content">
              <FaPlus size={18} className="fas fa-plus" />
              <FaCamera size={30} className="fas fa-camera fa-2x" />
              <p>SEM PRESUNTE FOTKY</p>
              <p>alebo</p>
              <label htmlFor="file-1">
                <input
                  className="form-control inputfile"
                  id="file-1"
                  name="cover"
                  type="file"
                />
                <span className="btn btn-outline-secondary">
                  VYBERTE SÚBORY
                </span>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" className="modal-button">
              <FaPlus /> PRIDAŤ
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
