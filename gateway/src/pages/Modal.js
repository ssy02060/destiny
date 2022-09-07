

import React, { useEffect, useState, useRef, Component } from 'react';
import { AiOutlineCloseCircle, AiFillCloseCircle} from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import { TbStar } from "react-icons/tb";
import styled from "styled-components";
import "../style/Modal.css"
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

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

       
        const { imageUrl, movieNm,story, movieCd, openDt,nationNm, rate ,comment,showTm,directors,actors,watchGradeNm,genre} = movieInfo
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

                
                  
                    <Contents>
                    
                        <img  src={imageUrl} alt={movieNm} />
                        <p className='close' onClick={onClose}>
                     <RiCloseCircleFill/>
                 </p>
                        
                        <Info>
                        <h1>{openDt} | {nationNm}</h1>
                        <h1>평점<TbStar/> {rate}</h1>
<HorizonLine/>
                        <h2>기본정보</h2>
                        <h1>{movieNm}</h1>
                        <h1>{showTm}</h1>
                        
                        <h1>{story}</h1>
                        <HorizonLine/>
                        <h2>상세정보</h2>
                        <h1>감독 : {directors}</h1>
                        <h1>출연진 : {actors}</h1>
                        <h1>관람등급 : {watchGradeNm}</h1>
                        <HorizonLine/>
                        <h2>비슷한 작품</h2>
                        <img  src={imageUrl} alt={movieNm} />
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
const HorizonLine = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >

    </div>
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
  overflow-y : scroll;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: 70%;
  border-radius: 0px;
  background-color: #fff;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  overflow-y : scroll;
 
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
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  img {
    
    width: 100%;
    height : 314px;
  }
  background-color: #fff;
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