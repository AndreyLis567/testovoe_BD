import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import { AddButton } from '../addButton.js/addButton';
import CommentsForm from '../commentsForm.js/commentsForm';

const alias = 'MAA_Movie-';
const api_url = 'https://yts.mx/api/v2/list_movies.json';

const List = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [isLoaded, setIsLoaded] = useState(false);
   const [items, setItems] = useState([]);
   const [totalMovies, setTotalMovies] = useState(0);
   const [totalCountPage, setTotalCountPage] = useState(0);
   const [page, setPage] = useState(1);
   const [currentItem, setCurrentItem] = useState(null);

   useEffect(() => {
      setIsLoading(true);
      axios.get(`${api_url}?page=${page}`)
         .then(res => {
            const movies = res.data.data.movies;
            setPage(res.data.data.page_number);
            setTotalMovies(res.data.data)
            setItems(movies);
            setIsLoading(false);
            setIsLoaded(true);

         })

   }, [page]);

   useEffect(() => {
      if (!isLoaded) {
         return
      }
      const getTotalCountPage = Math.ceil(totalMovies.movie_count / totalMovies.limit);
      setTotalCountPage(getTotalCountPage);

   }, [isLoaded, totalMovies])

   const buildItemInfo = (item) => {
      axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${item.id}`)
         .then(res => {
            setCurrentItem(res.data.data.movie)
         })
   }

   const buildItems = () => {
      return (
         <Container>
            <h2 className={`${alias}my-list-title`}>List Movies</h2>
            <TableContainer component={Paper}>
               <Table size="small" aria-label="a dense table">
                  <TableHead>
                     <TableRow>
                        <TableCell className={`${alias}table-th`}><Typography variant="h5" className={`${alias}table-h`}>Avatar</Typography></TableCell>
                        <TableCell className={`${alias}table-th`}><Typography variant="h5" className={`${alias}table-h`}>Title</Typography></TableCell>
                        <TableCell className={`${alias}table-th`}><Typography variant="h5" className={`${alias}table-h`}>Year</Typography></TableCell>
                        <TableCell className={`${alias}table-th`}><Typography variant="h5" className={`${alias}table-h`}>Genres</Typography></TableCell>
                        <TableCell className={`${alias}table-th`}><Typography variant="h5" className={`${alias}table-h`}>Rating</Typography></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {items.map((film) => (
                        <TableRow key={film.id} onClick={() => buildItemInfo(film)}>
                           <TableCell className={`${alias}table-th`} component="th" scope="row">
                              <Avatar alt="" src={film.small_cover_image} />
                           </TableCell>
                           <TableCell className={`${alias}table-th`} ><Typography className={`${alias}table-p`}>{film.title}</Typography></TableCell>
                           <TableCell className={`${alias}table-th`}><Typography className={`${alias}table-p`}>{film.year}</Typography></TableCell>
                           <TableCell className={`${alias}table-cell-genres`}>
                              {film.genres ? <Typography className={`${alias}table-genres`}> {film.genres[0]}</Typography> : ""}
                              {film.genres ? <Typography className={`${alias}table-genres`}> {film.genres[1]}</Typography> : ""}
                              {film.genres ? <Typography className={`${alias}table-genres`}> {film.genres[2]}</Typography> : ""}
                              {film.genres ? <Typography className={`${alias}table-genres`}> {film.genres[3]}</Typography> : ""}
                           </TableCell>
                           <TableCell className={`${alias}table-th`}><Rating name="half-rating-read"
                              precision={0.5}
                              max={10}
                              value={film.rating} readOnly /></TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Container>)
   }

   const paginationChange = (e, value) => {
      if (page !== value) {
         setItems([]);
         setPage(value);
      }
   }

   const buildCurrentItem = () => {
      return (<div className={`${alias}current-item ${alias}fade-in`}>
         <div style={{
            backgroundImage: `url(${currentItem.background_image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: '0.8'
         }}>
         </div>
         <div className={`${alias}current-item-header`} >
            <span onClick={() => setCurrentItem(null)}><ArrowBackIcon /></span>
         </div>
         <div className={`${alias}current-item-content`}>
            <h1>{currentItem.title}</h1>
            <p>{currentItem.description_full}</p>
            <div className={`${alias}current-item-release ${alias}current-item-data`}>
               <span>Release Date: </span>
               <span>{currentItem.year}</span>
            </div>
            <div className={`${alias}current-item-vote ${alias}current-item-data`}>
               <span>Rating: </span>
               <span>{currentItem.rating}</span>
            </div>
            <div className={`${alias}current-item-genres`}>
               {currentItem.genres && currentItem.genres.length > 0 ? <span> {currentItem.genres[0]}</span> : null}
               {currentItem.genres && currentItem.genres.length > 1 ? <span> {currentItem.genres[1]}</span> : null}
               {currentItem.genres && currentItem.genres.length > 2 ? <span> {currentItem.genres[2]}</span> : null}
               {currentItem.genres && currentItem.genres.length > 3 ? <span> {currentItem.genres[3]}</span> : null}
            </div>
            <AddButton currentItem={currentItem} />
            <div>
               <CommentsForm currentItemId={currentItem.id}/>
            </div>
         </div>
      </div>)
   }

   return (
      <div className={`${alias}content`}>
         {currentItem ? buildCurrentItem() : ""}
         {isLoading && <CircularProgress size={2} />}
         {!isLoading && !currentItem && <div className={`${alias}items-list ${alias}fade-in`}>
            {items.length > 0 && buildItems()}
         </div>}
         {!currentItem && <Pagination count={totalCountPage} variant="outlined" color="primary" shape="rounded" onChange={paginationChange} />}
      </div>
   )
}

export default List
