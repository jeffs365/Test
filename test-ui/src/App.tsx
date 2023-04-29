import React from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { Main } from './components/Main';


function App() {
  const [selectedShelve, setSelectedShelve] = React.useState<any>();
  const [formShelve, setFormShelve] = React.useState<any>();
  const [formBook, setFormBook] = React.useState<any>();

  return (
    <AppContext.Provider value={{
      selectedShelve, setSelectedShelve,
      formShelve, setFormShelve,
      formBook, setFormBook
    }}>
      <Main />
    </AppContext.Provider>
  );
}

export default App;
