import React from 'react';
import './ImageGalleryItem.css';

function ImageGalleryItem({ images, onClick }) {
  const getId = e => {
    const id = e.currentTarget.id;
    onClick(id);
  };

  return images.map(({ largeImageURL, id }) => (
    <li key={id} id={id} className="ImageGalleryItem" onClick={getId}>
      <img src={largeImageURL} alt="" className="ImageGalleryItem-image" />
    </li>
  ));
}

export default ImageGalleryItem;
