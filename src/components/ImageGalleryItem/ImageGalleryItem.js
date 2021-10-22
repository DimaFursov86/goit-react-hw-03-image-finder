import s from "./ImageGalleryItem.module.scss";
import PropTypes from "prop-types";
export default function ImageGalleryItem({
  webformatURL,
  tags,
  openModal,
  largeImageURL,
}) {
  return (
    <li className={s.listItem}>
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={openModal}
        className={s.photoCard}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
