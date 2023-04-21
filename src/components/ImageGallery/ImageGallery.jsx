import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";

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