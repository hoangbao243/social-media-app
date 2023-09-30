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
import FriendProfile from './components/FriendProfile';
import Status from './components/Status';
import UpdateProfile from './components/UpdateProfile';
import Search from './components/Search';
import UpdateStatus from './components/UpdateStatus';
import ChatId from './components/ChatMessage';

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
    path: "/chatid/:id",
    element: <ChatId />,
  },
  {
    path: "/loginadmin",
    element: <LoginAdmin />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/friendprofile/:id",
    element: <FriendProfile />,
  },
  {
    path: "/status/:id",
    element: <Status />,
  },
  {
    path: "/updateprofile/:id",
    element: <UpdateProfile />,
  },
  {
    path: "/updatestatus/:id",
    element: <UpdateStatus />,
  },
  {
    path: "/search/:stringParam",
    element: <Search />,
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
