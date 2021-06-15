import React from "react";


const alias = 'MAA_Movie-';

const CommentsList = ({ entries, deleteItem }) => {
  
   return (
      <ul>
         {entries.map(item => {
            return(
            <div key={item.id} className={`${alias}form-list`}>
            <li>{item.text}</li>
            <span aria-label="delete" role="img" onClick={() => deleteItem(item.id)}>
               ❌
            </span>
         </div>)
         })}
      </ul>
   );
};

export default CommentsList;