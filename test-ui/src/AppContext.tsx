import React from 'react';

type AppContextType = {
    selectedShelve?: any;
    setSelectedShelve: (shelve: any) => void;
    formShelve?: any;
    setFormShelve: (shelve: any) => void;
    formBook?: any;
    setFormBook: (book: any) => void;
  };

export const AppContext = React.createContext<AppContextType>({} as AppContextType);
