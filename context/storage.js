import { useContext, useEffect } from 'react';

const StorageContext = createContext();

export function StorageProvider({ children }) {

    useEffect(() => {
       if (window.localStorage) {

       }
    }, [window]);

    return (
        <StorageContext.Provider value={{ }}>
            {children}
        </StorageContext.Provider>
    );

}

export const useDatastore = () => useContext(StorageContext);