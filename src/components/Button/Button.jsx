import React, { Component } from 'react'
import { ButtonLoadMore } from "./Button.styled"

class Button extends Component {
    state = { 
        page: 1
    } 
    
    ChangePage = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        }, () => {
      this.props.updatePage(this.state.page);
    })
        
        // this.props.updatePage(this.state.page);
    }

    render() { 
        return (
            <ButtonLoadMore onClick={this.ChangePage} type='button'>Load more</ButtonLoadMore>
        );
    }
}
 
export default Button;
