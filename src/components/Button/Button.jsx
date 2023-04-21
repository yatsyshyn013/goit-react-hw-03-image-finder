import React, { Component } from 'react'
import { ButtonLoadMore } from "./Button.styled"
import PropTypes from 'prop-types';
import { Link, animateScroll as scroll } from "react-scroll";

 

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
    }

    render() { 
        return (
            <ButtonLoadMore onClick={this.ChangePage} type='button'>Load more</ButtonLoadMore>
        );
    }
}
 
export default Button;


Button.propTypes = {
    updatePage: PropTypes.func.isRequired,
}