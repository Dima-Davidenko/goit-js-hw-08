import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
import { galleryItems } from './gallery-items';

function createGaleryMarkup(galleryItems) {
  const markup = galleryItems
    .map(({ preview = '#', original = '#', description = '#' } = {}) => {
      return `<div class="gallery__item">
      <a class="gallery__item" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join('');
  return markup;
}

const gallery = document.querySelector('.gallery');

const galleryMarkup = createGaleryMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSlide: false,
  animationSpeed: 500,
  maxZoom: 5,
});
