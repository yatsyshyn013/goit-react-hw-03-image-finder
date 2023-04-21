import axios from 'axios';
import PropTypes from 'prop-types';

    


// export const ImagesApi = async values => {
//     const response = await axios.get


// }



export async function ImagesApi(value, page = 1) {
    
    axios.defaults.baseURL = 'https://pixabay.com/api';

    const KEY = '33939890-a3090e3aada617e55ee2e122d'
    
    try {
        const url = `/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`

        const response = await axios.get(url)
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
    
    
}

ImagesApi.propTypes = {
    value: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired
}