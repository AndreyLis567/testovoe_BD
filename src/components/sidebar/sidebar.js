import React from 'react';

const alias = 'MAA_Movie-';

const side = ['List Movies', 'My List'];

const Sidebar = ({currentTab, setCurrentTab}) => {
  return (
    <div className={`${alias}sidebar`}>
       <h1>List movies</h1>
      <ul>
        {
          side.map((item, index) => <li key={index} onClick={() => setCurrentTab(index)} className={currentTab === index ? 'curentTab':''}>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Sidebar;
