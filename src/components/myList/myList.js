import React from 'react';

const alias = 'MAA_Movie-';


const MyList = () => {

   const currentMovies = JSON.parse(localStorage.getItem("current-movies") || "[]");

   const buildMyList = () => {
      return currentMovies.filter(item => item.img_path).map((item, index) => {
         return <div key={index} className={`${alias}item-list ${alias}item`}>
            <img src={item.img_path} alt={item.title} />
            <div><p style={{ fontSize: '14px' }}>{item.title}</p></div>
         </div>
      });
   }

   return (
      <div className={`${alias}content ${alias}content-my-list`}>
         <h2 className={`${alias}my-list-title`}>My List</h2>
         {currentMovies.length > 0 ? <div className={`${alias}items-list ${alias}fade-in ${alias}my-list`}> {buildMyList()}</div> : <p>There are no items in your list at this moment</p>}
      </div>
   )
}

export default MyList
