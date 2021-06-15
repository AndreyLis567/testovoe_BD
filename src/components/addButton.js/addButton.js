import Tooltip from '@material-ui/core/Tooltip';
import { useCallback, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const STATUS_ADD = {
   ADD: 'add',
   ADDED: 'added'
}

const TITLE_BY_ADD = {
   [STATUS_ADD.ADD]: 'Add',
   [STATUS_ADD.ADDED]: 'Added'
}

const alias = 'MAA_Movie-';

export const AddButton = ({currentItem}) => {
   const [statusAdd, setStatusAdd] = useState(STATUS_ADD.ADD);

   const onClickAway = useCallback(() => {
      setStatusAdd("add")
   }, [setStatusAdd])

   return (
      <div className={`${alias}current-item-add-mylist`}>
         <ClickAwayListener onClickAway={onClickAway}>
            <Tooltip title={TITLE_BY_ADD[statusAdd]} placement="top" arrow>
               <button onClick={() => {
                  let itemToStore = {
                     img_path: currentItem.medium_cover_image,
                     title: currentItem.title
                  }
                  let currentMovies = JSON.parse(localStorage.getItem("current-movies") || "[]");

                  if (!(currentMovies.filter(item => item.title === itemToStore.title).length > 0)) {
                     currentMovies.push(itemToStore);
                     console.log(`Added movie: ${itemToStore.title}`);
                     localStorage.setItem("current-movies", JSON.stringify(currentMovies));
                  }
                  setStatusAdd("added")
               }}>Add to MyList</button>
            </Tooltip>
         </ClickAwayListener>
      </div>
   )
}
