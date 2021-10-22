import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.scss";

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
