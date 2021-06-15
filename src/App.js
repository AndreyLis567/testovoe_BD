import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import List from './components/movieList/movieList';
import MyList from './components/myList/myList';

const alias = 'MAA_Movie-';

const App = () => {

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={`${alias}wrapper`}>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab === 0 && <List />}
          {currentTab === 1 && <MyList />}
    </div>
  );
}

export default App;

