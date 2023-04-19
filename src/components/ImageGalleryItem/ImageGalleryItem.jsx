export function ImageGalleryItem({imageItem }) {
    console.log(imageItem);
    return (
    
         <li className="gallery-item">
                            <img src={imageItem.webformatURL} alt="" data-url={imageItem.largeImageURL} width='60px'/>
                        </li>
        
    )
}