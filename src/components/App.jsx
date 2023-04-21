import React, { Component } from 'react'
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesApi } from './PixabayAPI/PixabayAPI'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import Button from './Button/Button';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalWindow from './Modal/Modal';
import { logDOM } from '@testing-library/react';
import { Link, animateScroll as scroll } from "react-scroll";
import { Loader } from './Loader/Loader';


class App extends Component {
  state = {
    search: '',
    inputValue: [],
    page: 1,
    loading: false,
    showModal: false,
    modalUrl: null,
    totalResults: 0,
  } 

  onInputValue = async (value) => {
    this.setState({ loading: true });
    const { page } = this.state;
    const request = await ImagesApi(value.inputValue, page)
    const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
      return { id, webformatURL, largeImageURL}});
    console.log(data);

    if (data.length===0) {
       toast.error('Sorry, there are no images matching your search query. Please try again.');
    }  else {
            toast.info(
                `Hooray! We found ${request.totalHits} images.`
      );
            
        }
    
    this.setState({
      search: value.inputValue,
      inputValue: data,
      page: 1,
      loading: false
    })
  }

  updatePage = (pageNumber) => {
    this.setState({ page: pageNumber})
  }

  async componentDidUpdate(prevProp, prevState) { 
    const { search, page, loading } = this.state;
    // console.log(search);

    if (prevState.search !== search) {
      this.setState({
        inputValue: [],
        page: 1,
        totalResults: 0,
      });

      this.setState({ loading: true });
      const request = await ImagesApi(search)
      const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
      return { id, webformatURL, largeImageURL }});
      

      this.setState({
        inputValue: data,
        loading: false,
        totalResults: request.totalHits,
        
      })
    }

    else if (prevState.page !== page) {
      this.setState({ loading: true });
    
      const request = await ImagesApi(search, page)
      const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
      return { id, webformatURL, largeImageURL }});
      
      this.setState({
        inputValue: [...prevState.inputValue, ...data],
        loading: false,
        
      })
      // console.log(request);
      // console.log(data);
     
    }

  }


  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

  openModalImg = element => {
    if (element.nodeName !== 'IMG') {
      return;
    }

    this.toggleModal();
    this.setState({
      modalUrl: element.dataset.url,
    });
  };

  
 
  render() { 

    const {loading, inputValue, showModal, modalUrl, totalResults} = this.state;

    return (
       <Container>

        <Searchbar onSubmit={this.onInputValue} />

        
        
        {inputValue.length > 0 && (
            <ImageGallery items={inputValue} openModal={this.openModalImg} />
        )}

        {loading && (<Loader/>)}

        {inputValue.length > 0 && inputValue.length < totalResults && !loading && (
            <Button updatePage={this.updatePage} />
          
        )}
        

        {showModal && (
          <ModalWindow toggle={this.toggleModal} url={modalUrl} />
        )}

         <ToastContainer
          autoClose={3000}
          position="top-right"
          theme="colored"
/>

    </Container>
    );
  }
}
 
export default App;

