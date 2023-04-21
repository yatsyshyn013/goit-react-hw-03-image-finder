import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

export function ImageGallery({items, openModal}) {
    // console.log(items);
    return (
        <Gallery className="gallery" onClick={e=>{openModal(e.target)}}>

            {items.map(item => (
                <ImageGalleryItem item={item} key={item.id} />
            ))}
            

        </Gallery>
    )
}

ImageGallery.propTypes = {
    items: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}