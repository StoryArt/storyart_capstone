import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {

    const [user, setUser] = useState({});

    useEffect(() => {   
        // getCategories();
    }, []);

   
    const state = { user };
    const methods = { setUser };

    return (
        <UserContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </UserContext.Provider>
    )
}