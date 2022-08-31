

import React, { useEffect, useState, useRef, Component } from 'react';
import { AiOutlineCloseCircle, AiFillCloseCircle} from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import styled from "styled-components";

function useOutSideClick(ref, callback) {
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback?.();
            }
        };

        window.addEventListener("mousedown", handleClick);

        return () => window.removeEventListener("mousedown", handleClick);
    }, [ref, callback]);
}


const Modal = ({ onClose, movieInfo }) => {

    const { poster, MovieNm, rank, year, rating } = movieInfo
    console.log("modal")
    const modalRef = useRef(null)
    const handleClose = () => {
        onClose?.();
    };
    useOutSideClick(modalRef, handleClose);
    useEffect(() => {
        const $body = document.querySelector("body");
        $body.style.overflow = "hidden";
        return () => ($body.style.overflow = "auto");
    }, []);

    console.log("modal")
    return (
       
            <Overlay className="modal">

                <ModalWrap ref={modalRef}>


                    {/* <CloseButton onClick={handleClose}>
       <i className="fa-solid fa-xmark"></i>
     </CloseButton> */}
                    <Contents>
                        
                        <img className='poster_Box ' src={poster} alt={MovieNm} />
                        <p className='close' onClick={onClose}>
                     <RiCloseCircleFill/>
                 </p>
                        {/* <Button onClick={handleClose}><AiOutlineCloseCircle />
                        </Button> */}
                        <Info>
                        <h3>{year}</h3>
                        <h3>{rating}</h3>
                        <h2>기본정보</h2>
                        <h3>{MovieNm}</h3>
                        </Info>
                        


                    </Contents>
                </ModalWrap>
            </Overlay>
       

        // <div className='modal'>
        //     <div className='bg'></div>
        //     <div className='popup'>
        //         <h3>{rank}</h3>
        //         <div>

        //         <img className='poster_Box ' src={poster}  alt={MovieNm}/>
        //         </div>
        //         <br/>

        //         <p className='close' onClick={onClose}>
        //             <AiOutlineCloseCircle/>
        //         </p>
        //     </div>
        // </div>
    );
};

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: fit-content;
  border-radius: 0px;
  background-color: #fff;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 0;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    
    width: 100%;
  }
  background-color: #ababab;
  borderWidth: 2,
  borderRadius: 5,
 
 borderStyle: 'dotted'
`;

const Info = styled.div`

borderWidth: 6,
borderRightColor: '#cdcdcd',
`;
const Button = styled.button`

  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #ababab;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;


export default Modal;