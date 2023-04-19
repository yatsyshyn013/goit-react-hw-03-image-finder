export function ImageGalleryItem({item }) {
    console.log(item);
    return (
    
         <li className="gallery-item">
                            <img src={item.webformatURL} alt="" data-url={item.largeImageURL} width='20px'/>
                        </li>
        
    )
}