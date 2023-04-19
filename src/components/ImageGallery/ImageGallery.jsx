import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({request}) {
    console.log(request);
    return (
        <ul className="gallery">

            {request.map(item => (
                <ImageGalleryItem item={request} key={item.id} />
            ))}
            

        </ul>
    )
}