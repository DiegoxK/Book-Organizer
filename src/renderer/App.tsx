import { useState } from 'react';
import './scss/App.scss';

import LayoutMenu from './views/Main Layout/LayoutMenu';
import MainMenu from './views/Main Layout/MainMenu';

function App() {
  const [menuOption, setMenuOption] = useState('Home');

  const handleMenuChange = (option: string) => {
    setMenuOption(option);
  };

  return (
    <div className="app">
      <LayoutMenu handleMenuChange={handleMenuChange} />
      <MainMenu menuOption={menuOption} />
    </div>
  );
}

export default App;
