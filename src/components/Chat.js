import React, { useContext, useState, useEffect } from "react";
import { Context } from '../context/myContext';
import axios from 'axios';
import Header from "./Header";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import settings from "../svg/settings.svg"
import plus from "../svg/plus.svg"
import { Link, useNavigate } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import { auth, firestore } from "../firebase/firebase";
import LeftBar from "./LeftBar";



export default function Profile () {
  const [currentUser, setCurrentUser] = useState(null);
  const {user,setUser} = useContext(Context);
  const navigate = useNavigate();


  const messagesRef = firestore.collection('/messages');
  const query = messagesRef.orderBy('createAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('')
  
  console.log(currentUser);
  const getUser = async () => {
    try {
      const response = await axios.get(
        'https://vtcsyp-5555.csb.app/user',
      );
      if (response.status === 200) {
        const targetUser2 = response.data.find(item => item.username === user.username);
        setCurrentUser(targetUser2)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
	};
  }
  useEffect(() => {
    if(user && user.username){
      getUser();
    }
	}, [user])

  const sendMessage = async (e) =>{
    e.preventDefault();
    const uid = currentUser.id;
    const photoURL = currentUser.image;
    await messagesRef.add({
      text: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL:photoURL
    })
    setFormValue('')
  }
  const handleLogout = () =>{
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('admin');
    navigate('/login')
  }
  return (
    <div>
        <Header />
        <div className="flex flex-row w-full h-screen">
        {
          currentUser?.username ? (
                  <div className="flex flex-row w-full h-screen bg-white">
                    <div class=" w-1/4 p-4">
                      <div className="flex flex-col w-8/12 h-[168px] mt-4 mx-auto bg-bg-grey rounded-[18px] shadow-2xl shadow-blue-200">
                        <div className="flex flex-row gap-4">
                          
                          {
                            currentUser?.username ? (
                              <div className="flex flex-col w-full lg:h-[168px]">
                                <div className="flex lg:flex-row sm:flex-col gap-4">
                                  <div className="rounded-[18px] w-[44px] h-[44px] bg-bg-grey ml-6 mt-4">
                                    <img className="rounded-full w-[44px] h-[44px] lg:block sm:hidden" src={currentUser.image}></img>
                                  </div>
                                  <div className="mt-6 font-bold text-[17px] lg:block sm:hidden">
                                    {currentUser.username}
                                  </div>
                                </div>
                                <div className="ml-6 mt-2 mb-2 text-[blue]">
                                  
                                </div>
                                <button onClick={handleLogout} className="py-3 px-3 w-full rounded-md bg-orange-300 text-black text-[20px]">
                                    Logout
                                </button>
                              </div>

                            ) : (
                                <Link to={'/login'}>
                                    <button className="w-full py-3 px-8 rounded-md bg-[#FA8443] justify-center text-white ml-12 mt-12">Sign up</button>
                                </Link>
                            )
                          }
                        </div>
                      </div>
                      <LeftBar currentUser={currentUser} />
                    </div>
                    <div className="relative flex flex-col w-6/12 h-full bg-white">
                      
                      
                    </div>
                  </div>

                ) : (
                    <Link to={'/login'}>
                        <button className="w-full py-3 px-8 rounded-md bg-[#FA8443] justify-center text-white ml-12 mt-12">Sign up</button>
                    </Link>
                )
        }
        </div>
    </div>
  )
}

function ChatMessage (props) {
  const {text, uid} = props.messages
  return <p>{text}</p>
}
