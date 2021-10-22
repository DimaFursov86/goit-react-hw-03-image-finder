import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.scss";
import PropTypes from "prop-types";
export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ webformatURL, tags, largeImageURL }, index) => (
        <ImageGalleryItem
          key={index}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};
