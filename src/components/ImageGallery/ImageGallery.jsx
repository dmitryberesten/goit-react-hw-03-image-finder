import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'; // елемент галереї
import PropTypes from 'prop-types'; // типизація пропсів
import css from './ImageGallery.module.css'; // імпортуємо стилі

// Функціональний компонент, який відповідає за галерею.
export const ImageGallery = ({ images, togleModal }) => {
  return (
    <>
      <ul className={css.gallery}>
        <ImageGalleryItem togleModal={togleModal} images={images} />
      </ul>
    </>
  );
};

// типизація пропсів
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, // масив об'єктів
  togleModal: PropTypes.func.isRequired // функція
};

// Діма Берестень
