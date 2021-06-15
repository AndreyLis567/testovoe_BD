import React, { useState } from "react";
import CommentsList from "./commentsList.js/commentsList";

class idGenerator {
   static id = 0;
   static next() {
      return ++this.id;
   }
}

const CommentsForm = ({ currentItemId }) => {
   const [comments, setComments] = useState([]);
   const [textValue, setTextValue] = useState('');

   const addItem = (e) => {
      if (textValue !== "") {
         const newComments = {
            text: textValue,
            id: idGenerator.next()
         };
         setComments(
            [...comments, newComments]
         )
         setTextValue('')
         e.preventDefault();
      }
   }

   const deleteItem = (id) => {
      setComments(comments.filter(i => i.id !== id))
   }

   return (
      <div style={{marginTop:10}}>
         <div>
            <form id={currentItemId} onSubmit={addItem}>
               <input
                  value={textValue}
                  id={Date.now()}
                  placeholder="write comments"
                  onChange={(event) => {
                      setTextValue(event.target.value) }}>
               </input>
               <button type="submit">send</button>
            </form>
         </div>
         <CommentsList deleteItem={deleteItem} entries={comments} />
      </div>
   );
}


export default CommentsForm;