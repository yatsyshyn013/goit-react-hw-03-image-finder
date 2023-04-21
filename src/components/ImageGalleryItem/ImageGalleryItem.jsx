import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';


export function ImageGalleryItem({item}) {
    // console.log(imageItem);
    return (
    
        <GalleryItem className="gallery-item">
         
                <GalleryItemImage
                    src={item.webformatURL}
                    alt="photo"
                    data-url={item.largeImageURL}
                        width='260px' />
             
        </GalleryItem>
        
    )
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }).isRequired
}