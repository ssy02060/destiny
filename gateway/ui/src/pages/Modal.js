
import React from 'react';
import {AiOutlineCloseCircle} from "react-icons/ai";

const Modal = ({onClose,movieInfo}) => {

    const {poster,MovieNm, rank} = movieInfo
    console.log("modal")
    return (
        <div className='modal'>
            <div className='bg'></div>
            <div className='popup'>
                <h3>{rank}</h3>
                <div>
                <img className='poster_Box ' src={poster}  alt={MovieNm}/>
                </div>
                <br/>
                
                <p className='close' onClick={onClose}>
                    <AiOutlineCloseCircle/>
                </p>
            </div>
        </div>
    );
};

export default Modal;