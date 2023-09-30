import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from '../context/myContext';
import axios from 'axios';
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import firebase from "firebase/compat/app";
import { auth, firestore } from "../firebase/firebase";
import LeftBar from "./LeftBar";




export default function ChatId () {
  const [currentUser, setCurrentUser] = useState(null);
  const {user,setUser} = useContext(Context);
  const navigate = useNavigate();
  const [dataUserFriend, setDataUserFriend] = useState(null);
  const id = useParams();
  const [friendId, setFriendId] = useState(null)

  const dummy = useRef();
  const messagesRef = firestore.collection('/messages');
  const query = messagesRef.orderBy('createAt').limit(500);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

//   if (messages) {
//     const a = messages.filter(item=>item.uid === currentUser.id)
//     console.log(a);
//   }
  
  const sendMessage = async (e) =>{
    e.preventDefault();
    const uid = currentUser.id;
    const photoURL = currentUser.image;
    const receiveId = dataUserFriend.id
    await messagesRef.add({
      text: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      receiveId: receiveId,
      friendId: friendId,
      photoURL:photoURL
    })
    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'});
  }
  const getUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3004/user',
      );
      if (response.status === 200) {
        const targetUser2 = response.data.find(item => item.username === user.username);
        setCurrentUser(targetUser2)
        const dataFriend = response.data.find(item=>item.id === +id.id);
        setDataUserFriend(dataFriend);
        const response1 = await axios.get('http://localhost:3004/friend')
        if (response1.status === 200) {
            setFriendId(response1.data.find(item=>item.idUser === dataFriend.id && item.idFriend === targetUser2.id || item.idUser === targetUser2.id && item.idFriend === dataFriend.id).id)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
	};
  }
//   console.log(friendId);
  useEffect(() => {
    if(user && user.username){
      getUser();
    }
	}, [user])

 
  const handleLogout = () =>{
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('admin');
    navigate('/login')
  }
  return (
    <div>
        <Header />
        <div className="flex flex-row w-full h-full">
        {
          currentUser?.username ? (
                  <div className="flex flex-row w-full h-full bg-white">
                    <div class="w-1/4 p-4">
                      <div className="flex flex-col w-8/12 h-[168px] mt-4 mx-auto bg-bg-grey rounded-[18px] shadow-2xl shadow-blue-200">
                        <div className="flex flex-row gap-4">
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
                        </div>
                      </div>
                      <LeftBar currentUser={currentUser} />
                    </div>
                    <div className="flex flex-col w-6/12 h-full bg-white">
                      {
                         <div className="w-full"> 
                            <div className="flex w-full h-14 bg-red-200 rounded-3xl">
                              <div className="flex ml-4 px-2 py-2  w-fit  rounded-[16px]">
                                <p className="text-[20px] font-medium">{dataUserFriend.username}</p>
                              </div>
                            </div>
                            <div className="flex flex-col w-full h-[46rem] overflow-auto">
                              {messages && messages.filter(item=>item.friendId === friendId).map(msg=> <ChatMessage dataUserFriend={dataUserFriend} currentUser={currentUser}  key={msg.id} messages={msg}>s</ChatMessage>)}
                              <div ref={dummy}></div>
                            </div>
                            <form className="flex bottom-0 w-full h-20" onSubmit={sendMessage}>
                              <input className="bg-gray-200 w-10/12 text-gray-900 px-2 py-1 text-lg rounded-l-lg border border-blue-500" value={formValue} onChange={e => setFormValue(e.target.value)} />
                              <button type="submit" className="bg-blue-500 text-white w-2/12 px-4 py-2 rounded-r-lg">Submit</button>
                            </form>
                         </div>
                      }
                      
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
    const currentUser = props.currentUser;
    const dataUserFriend = props.dataUserFriend;
    const {text, uid , receiveId ,createAt} = props.messages;
    
    const date = new Date(0)
    if (createAt) {
        date.setUTCSeconds(createAt.seconds)
    }
    const formattedDate = date.toLocaleString()
    console.log(formattedDate);
  return <div style={{justifyContent: currentUser.id === uid ? 'flex-end' : 'flex-start'}} className="flex  w-full ">
            <div className="mt-4">
                <p className="text-[12px]">{formattedDate.split(' ')[0]}</p>
                <p className="text-[12px]">{formattedDate.split(' ')[1]}</p>
            </div>
            <p className="w-fit px-4 py-4 mx-2 my-2 rounded-3xl bg-blue-200">
                {text}
            </p>
            <img className="rounded-full w-11 h-11 mt-4" src={uid === currentUser.id ? currentUser.image : dataUserFriend.image}></img>
        </div>
}

