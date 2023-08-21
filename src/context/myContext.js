import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = Context.Provider;

const initialState = {
    username: '',
    password: '',
    image: '',
}

function MyContext({children}) {
    const [user, setUser] = useState(initialState);

    useEffect(()=>{
        const usernameStore = window.localStorage.getItem('username');
        setUser({...user, username: usernameStore});
    },[])
  return (
    <Provider value={{user,setUser}}>
        {children}
    </Provider>
  )
}

export {Context, MyContext}
