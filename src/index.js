import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import Profile from './components/Profile';
import { MyContext } from './context/myContext';
import ListFriend from './components/ListFriend';
import Chat from './components/Chat';
import LoginAdmin from './admin/LoginAdmin';
import Admin from './admin/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/friends",
    element: <ListFriend />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/loginadmin",
    element: <LoginAdmin />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <MyContext>
      <RouterProvider router={router} />
    </MyContext>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
