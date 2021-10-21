import ImageGalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className="ImageGallery">
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
