import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";

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