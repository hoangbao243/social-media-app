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
        const admin = window.localStorage.getItem('admin')
        if (admin && usernameStore) {
          window.localStorage.removeItem('username');
          setUser({...user, adminName: admin, username: admin});
          window.location.reload();
        }else if (admin) {
          setUser({...user, adminName: admin, username: admin});
        }else{
          setUser({...user, username: usernameStore});
        }
    },[])
  return (
    <Provider value={{user,setUser}}>
        {children}
    </Provider>
  )
}

export {Context, MyContext}
