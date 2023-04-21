import React, { Component } from 'react'
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesApi } from './PixabayAPI/PixabayAPI'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import Button from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import ModalWindow from './Modal/Modal';
import { logDOM } from '@testing-library/react';


class App extends Component {
  state = {
    search: '',
    inputValue: [],
    page: 1,
    loading: false,
    showModal: false,
    modalUrl: null,
  } 

  onInputValue = async (value) => {
    this.setState({ loading: true });
    const { page } = this.state;
    const request = await ImagesApi(value.inputValue, page)
    const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
      return { id, webformatURL, largeImageURL }});
    
    
    this.setState({
      search: value.inputValue,
      inputValue: data,
      page: 1,
      loading: false
    })

    // console.log(this.state.inputValue);
    // console.log(this.state.search);

    // console.log(request);
    // console.log(this.state.inputValue);
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
      });

      this.setState({ loading: true });
      const request = await ImagesApi(search)
      const data = await request.hits.map(({ id, webformatURL, largeImageURL }) => {
      
      return { id, webformatURL, largeImageURL }});
      

      this.setState({
        inputValue: data,
        loading: false,
        
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
      // console.log(page);
     
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
    return (
       <Container
      >

        <Searchbar onSubmit={this.onInputValue} />

        {this.state.loading && (
                <ThreeDots 
                      height="180" 
                      width="180" 
                      radius="9"
                      color="#3f51b5" 
                      ariaLabel="three-dots-loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"}}
                      wrapperClassName=""
                      visible={true}
          />)}
        
        {this.state.inputValue.length > 0 && (<ImageGallery items={this.state.inputValue} openModal={this.openModalImg} />)}
        

        {this.state.inputValue.length > 0 && (
          <Button updatePage={this.updatePage} />
        )}

        {this.state.showModal && (
          
          <ModalWindow toggle={this.toggleModal} url={this.state.modalUrl} />
        )}
        

        {/* <ImagesApi inputValue={this.state.inputValue} /> */}
    </Container>
    );
  }
}
 
export default App;

