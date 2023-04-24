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
    error: null,
  } 

   async componentDidUpdate(prevProp, prevState) { 
    const { search, page, loading } = this.state;
    // console.log(search);

    if (prevState.search !== search) {
      // console.log(1);
       this.setState({
        inputValue: [],
        page: 1,
        totalResults: 0,
        loading: true
         });

      try {
        const request = await ImagesApi(search)
        const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
        
        return { id, webformatURL, largeImageURL }});
        
        if (data.length===0) {
                toast.error('Sorry, there are no images matching your search query. Please try again.', {
                      icon: '💔',
                    });
              }  else {
                      toast.info(
                          `Hooray! We found ${request.totalHits} images.`
                );
                      
                  }

        this.setState({
          inputValue: data,
          loading: false,
          totalResults: request.totalHits,
          
        })
    } catch (error) {
      this.setState({ error });
    }

      
    }

    else if (prevState.page !== page && prevState.page < page) {
      // console.log(prevState.search);
      // console.log(search);
      // console.log(2);
      this.setState({ loading: true });

      
      
      try {
          const request = await ImagesApi(search, page)
          const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
          return { id, webformatURL, largeImageURL }});
          //  console.log(data);
          this.setState({
            inputValue: [...prevState.inputValue, ...data],
            loading: false,
            
          })
      } catch (error) {
        this.setState({ error });
      }
    
      
      // console.log(request);
      // console.log(data);
     
     } 

  }


  onInputValue = async (value) => {
    // this.setState({ loading: true });
    const { page } = this.state;

    try {
              const filteredInfo = value.inputValue.trim()
              // console.log(filteredInfo);
            
               if (filteredInfo === '') {
                 return toast.error('The search field cannot be empty', {
                      icon: '👻',
                    });
      }

            // const request = await ImagesApi(filteredInfo, page)
            //   const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
                
            //     return { id, webformatURL, largeImageURL}});
      
              // if (data.length===0) {
              //   toast.error('Sorry, there are no images matching your search query. Please try again.', {
              //         icon: '💔',
              //       });
              // }  else {
              //         toast.info(
              //             `Hooray! We found ${request.totalHits} images.`
              //   );
                      
              //     }
              
              this.setState({
                search: filteredInfo,
                // inputValue: data,
                // page: 1,
                // loading: false,
                // totalResults: request.totalHits,
              })
              
              if (filteredInfo === this.state.search) {
                  toast.error(`This request "${filteredInfo}" is already in progress. It is not possible to send two identical requests in turn`, {
                      icon: '💞',
        });
       
      
      }
      

    } catch (error) {
      this.setState({ error });
    } finally {
        this.setState({ loading: false });
      }
    
  }

  updatePage = (pageN) => {
    this.setState({ page: pageN})
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

    const {loading, inputValue, showModal, modalUrl, totalResults, search, page} = this.state;

    return (
       <Container>

        <Searchbar onSubmit={this.onInputValue} />

        
        
        {inputValue.length > 0 && (
            <ImageGallery items={inputValue} openModal={this.openModalImg} />
        )}

        {loading && search !== '' &&(<Loader/>)}

        {inputValue.length > 0 && inputValue.length < totalResults && !loading && (
            <Button updatePage={this.updatePage} numberPage={page}/>
          
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

