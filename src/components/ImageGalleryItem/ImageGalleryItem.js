export default function ImageGalleryItem({
  webformatURL,
  tags,
  openModal,
  largeImageURL,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={openModal}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
