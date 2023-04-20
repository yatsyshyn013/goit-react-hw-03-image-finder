import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";

export function ImageGallery({items}) {
    console.log(items);
    return (
        <Gallery className="gallery">

            {items.map(item => (
                <ImageGalleryItem item={item} key={item.id} />
            ))}
            

        </Gallery>
    )
}