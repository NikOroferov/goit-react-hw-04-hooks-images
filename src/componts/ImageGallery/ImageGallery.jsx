import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

import ImageGalleryItem from 'componts/ImageGalleryItem/ImageGalleryItem';
import Button from 'componts/Button/Button';
import getImageApi from 'services/api-service';
import Modal from 'componts/Modal/Modal';
import Loader from 'react-loader-spinner';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};

function ImageGallery({ searchValue }) {
  const [page, setPage] = useState(1);
  const [imagesInfo, setImagesInfo] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setImagesInfo([]);
    setPage(1);
    setStatus(STATUS.PENDING);

    getImageApi(searchValue, page).then(responce => {
      if (responce.data.total !== 0) {
        const newImages = responce.data.hits;
        setImagesInfo(newImages);
        setStatus(STATUS.RESOLVE);
      } else {
        setStatus(STATUS.REJECT);
      }
    });
  }, [searchValue]);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    getImageApi(searchValue, page).then(responce => {
      const newImages = responce.data.hits;
      setImagesInfo(state => [...state, ...newImages]);
      setStatus(STATUS.RESOLVE);
    });
  }, [page]);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const formSubmitHandler = id => {
    setId(id);
    toggleModal();
  };

  const getInfoById = () => {
    return imagesInfo.find(image => image.id === +id);
  };

  if (status === STATUS.IDLE) {
    return <h2>Пожалуйста, введите поисковый запрос</h2>;
  }

  if (status === STATUS.PENDING) {
    return <Loader type="Oval" color="#043f53" height={80} width={80} />;
  }

  if (status === STATUS.REJECT) {
    return <h2>Иллюстрации по запросу {searchValue} не найдены</h2>;
  }

  if (status === STATUS.RESOLVE) {
    return (
      <div className="content">
        <ul className="ImageGallery">
          <ImageGalleryItem images={imagesInfo} onClick={formSubmitHandler} />
        </ul>
        <Button value="Load more" onClick={handleLoadMore} />

        {showModal && <Modal onClose={toggleModal} src={getInfoById()} />}
      </div>
    );
  }
}

export default ImageGallery;
