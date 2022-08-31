
import React ,{ useEffect, useState,useRef, Component  }from 'react';
import {AiOutlineCloseCircle} from "react-icons/ai";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
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
  
const Rating_Modal = ({onClose,movieInfo}) => {
    const [comment, setcomment] = useState('');
     
    //input에 입력될 때마다 account state값 변경되게 하는 함수
    const oncommentHandler= (e) => {
      setcomment(e.currentTarget.value);
      console.log(e.currentTarget.value)
    };

   
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
    const {poster,MovieNm, rank, year} = movieInfo
    console.log("modal")
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    return (
        <div className='rating_modal'>
            <Overlay className="modal">
       
       <ModalWrap ref={modalRef}>
       <CloseButton onClick={handleClose}>
           <i className="fa-solid fa-xmark"></i>
         </CloseButton>
         <Contents>
       <h3>{MovieNm}</h3>
       <h3>{year}</h3>
       <ReactStars
    count={5}
    onChange={ratingChanged => {
        console.log(ratingChanged);
      }}
    size={40}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />
         
         
         
         <input id="comment" name= "comment" placeholder="comment" type="text"   onChange={oncommentHandler}></input>
        
           <Button onClick={handleClose}>저장</Button>
         </Contents>
       </ModalWrap>
     </Overlay>
            {/* <div className='bg'></div>
            <div className='popup'>
                <h3>{rank}</h3>
                <div>
                <input id="comment" name= "comment" placeholder="comment" type="text"  ></input>
               
                </div>
                <br/>
                
                <p className='close' onClick={onClose}>
                    <AiOutlineCloseCircle/>
                </p>
            </div> */}
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
`;

const ModalWrap = styled.div`
  width: 300px;
  height: fit-content;
  border-radius: 15px;
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
  margin: 20px 30px;
  h1 {
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 00px;
    width: 300px;
  }
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



export default Rating_Modal;