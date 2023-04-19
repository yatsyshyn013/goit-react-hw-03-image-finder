import React, { Component } from 'react'
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesApi } from './PixabayAPI/PixabayAPI'
import { ImageGallery } from './ImageGallery/ImageGallery';


class App extends Component {
  state = {
    inputValue: [],
  } 

  onInputValue = async (value) => {
    const request = await ImagesApi(value)
    this.setState({ inputValue: request.hits })
    console.log(request);
    console.log(this.state.inputValue);
  }


  render() { 
    return (
       <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
        <Searchbar onSubmit={this.onInputValue} />
        <ImageGallery request={this.state.inputValue} />

        {/* <ImagesApi inputValue={this.state.inputValue} /> */}
    </div>
    );
  }
}
 
export default App;

