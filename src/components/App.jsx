import React, { Component } from 'react'
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesApi } from './PixabayAPI/PixabayAPI'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import Button  from './Button/Button';


class App extends Component {
  state = {
    search: '',
    inputValue: [],
    page: 1,
  } 

  onInputValue = async (value) => {
    
    const { page } = this.state;
    const request = await ImagesApi(value, page)
    
    this.setState({
      search: value.inputValue,
      inputValue: request.hits,
      page: 1,
    })

    console.log(this.state.search);

    // console.log(request);
    // console.log(this.state.inputValue);
  }

  updatePage = (pageNumber) => {
    this.setState({ page: pageNumber})
  }

  async componentDidUpdate(prevProp, prevState) { 
    const { search, page, inputValue } = this.state;
    // console.log(search);

    if (prevState.page !== page) {
      const request = await ImagesApi(search, page)
      this.setState({ search: request })
      console.log(request);
      console.log(page);
     
    }

  }


  render() { 
    return (
       <Container
    >
        <Searchbar onSubmit={this.onInputValue} />
        <ImageGallery items={this.state.inputValue} />

        {this.state.inputValue.length > 0 && (
          <Button updatePage={this.updatePage} />
        )}

        {/* <ImagesApi inputValue={this.state.inputValue} /> */}
    </Container>
    );
  }
}
 
export default App;

