import React from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { Main } from './components/Main';
import { BookType, ShelveType } from './models';


function App() {
  const [selectedShelve, setSelectedShelve] = React.useState<ShelveType>();
  const [formShelve, setFormShelve] = React.useState<ShelveType>();
  const [formBook, setFormBook] = React.useState<BookType>();

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
