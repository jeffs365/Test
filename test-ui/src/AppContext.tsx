import React from 'react';
import { BookType, ShelveType } from './models';

type AppContextType = {
    selectedShelve?: ShelveType;
    setSelectedShelve: (shelve?: ShelveType) => void;
    formShelve?: ShelveType;
    setFormShelve: (shelve?: ShelveType) => void;
    formBook?: BookType;
    setFormBook: (book?: BookType) => void;
  };

export const AppContext = React.createContext<AppContextType>({} as AppContextType);
