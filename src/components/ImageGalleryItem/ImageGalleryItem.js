import s from "./ImageGalleryItem.module.scss";

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
