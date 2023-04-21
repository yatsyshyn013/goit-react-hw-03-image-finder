// import * as basicLightbox from 'basiclightbox'
import React, { Component } from 'react'
import {createPortal} from "react-dom";
import { Overlay, Modal } from './Modal.styled'
import PropTypes from 'prop-types';

// export const Instance = basicLightbox.create(`
//     <div class="overlay">
//         <div class="modal">
//             <img src="" alt="" />
//         </div>
//     </div>
// `)

// Instance.show()

const modalRoot = document.querySelector("#modal-root")

class ModalWindow extends Component { 
    
    componentDidMount() {
        // console.log("Mount");
        window.addEventListener('keydown', this.handleKeydown); 
    }

    componentWillUnmount() {
        // console.log("UnMount");
    window.removeEventListener('keydown', this.handleKeydown);    
  }
   
    handleKeydown = e => {
        if (e.code ==='Escape') {
            this.props.toggle()  
        }
       
    }

    handleBackdrop = e => {

        if (e.currentTarget === e.target) {
            this.props.toggle()
        }
    }


    render() { 
        const { url } = this.props;
        return createPortal(
            <Overlay className="overlay" onClick={this.handleBackdrop}> 
             <Modal className="modal">
                 <img src={url} alt="" width="800px"/>
             </Modal>
            </Overlay> 
        , modalRoot);
    }
}
 
export default ModalWindow;


ModalWindow.propTypes = {
    toggle: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}