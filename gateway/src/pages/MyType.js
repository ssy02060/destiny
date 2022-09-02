import React, { Component ,useState} from 'react';
import "../style/MyType.css"
import Movie_list from "../sample-data/movie.json"


//  const MyTypeMovie = ({item}) => {
//   const { imageUrl, movieNm, movieCd, openDt,nationNm, rate } = item
//   const [isChecked, setIsChecked] = useState(false); //체크 여부
//   const [checkedItems, setCheckedItems] = useState(new Set());//체크된 요소들
  
//   const checkHandler = ({ target }) => {
//     setIsChecked(!isChecked);
//     checkedItemHandler(target.parentNode, target.value, target.checked);
//   };
//   const checkedItemHandler = (box, movieCd, isChecked) => {
//       if (isChecked) { //체크 되었을때
//         checkedItems.add(movieCd); //체크시 삽입
//         setCheckedItems(checkedItems); //체크 요소 넣어주기
//         box.style.backgroundColor = "#F6CB44"; //스타일 변경
//       } else if (!isChecked && checkedItems.has(movieCd)) { //체크가 안되었고, id가 있을때(클릭 2번시)
//         checkedItems.delete(movieCd); //체크 두번시 삭제
//         setCheckedItems(checkedItems);
//         box.style.backgroundColor = "#fff";
//       }
      

//       return checkedItems;
//     };
    
    
//         return (



//           <label key={movieCd}><input type="checkbox"  value={movieNm} onChange={(e)=>checkHandler(e)} />
//             <img className='poster_Box '  src={imageUrl}  alt={movieNm}/></label>
          
                 
                 
                
           





//         )
    
// }

const MyType = () => {
    const [data,setData] = useState(Movie_list)
    const [isChecked, setIsChecked] = useState(false); //체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set());//체크된 요소들
  
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.value, target.checked);
  };
  const checkedItemHandler = (box, movieCd, isChecked) => {
      if (isChecked) { //체크 되었을때
        checkedItems.add(movieCd); //체크시 삽입
        setCheckedItems(checkedItems); //체크 요소 넣어주기
        box.style.backgroundColor = "#F6CB44"; //스타일 변경
      } else if (!isChecked && checkedItems.has(movieCd)) { //체크가 안되었고, id가 있을때(클릭 2번시)
        checkedItems.delete(movieCd); //체크 두번시 삭제
        setCheckedItems(checkedItems);
        box.style.backgroundColor = "#fff";
      }
      

      return checkedItems;
    };
    console.log(checkedItems)
    return (
      <div>
      <div className='Type_header'>

          <h1 className='Type_logo'>DESTINY</h1>
          <hr className='Type_hr' />
          <div className='type_info'>User님의 취향대로 영화들을 선택해주세요!
              다양하네 선택할 수록 더 많은 영화를 추천 받을 수 있습니다.
        
          </div>
          
      </div>
      <div className='Type_layout'>
      
      {data.map(data => 
                   
                   <label key={data.movieCd}><input type="checkbox"  value={data.movieNm} onChange={(e)=>checkHandler(e)} />
                   <img className='poster_Box '  src={data.imageUrl}  alt={data.movieNm}/></label>
                 
               

            )}

      
</div>
</div>

    )

}


export default MyType;