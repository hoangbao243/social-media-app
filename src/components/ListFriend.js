import axios from "axios";
import Header from "./Header";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/myContext";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import { Link } from "react-router-dom";

export default function FriendProfile() {
    const {user,setUser} = useContext(Context);
    const [currentUser, setCurrentUser] = useState(null);
    const [friendList, setFriendList] = useState(null);
    const [friendListData, setFriendListData] = useState(null);
    const navigate = useNavigate();

    const getUserData = async () =>{
        const response = await axios.get('http://localhost:3004/user');
        if (response.status === 200) {
            const curUser = response.data.find(item => item.username === user.username);
            setCurrentUser(curUser);
        }
    }
    const getListAddFriend = async () =>{
      const response1 = await axios.get('http://localhost:3004/friend')
        if (response1.status === 200) {
          setFriendList(response1.data.filter(item => item.idFriend === currentUser.id && item.statusFriend === 1));
        }
    }

    const getFriendData = async (id) =>{
      try {
        const response4 = await axios.get('http://localhost:3004/user/' + id);
        return response4.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    const fetchUserDataForArray = async (data) => {
      if (data) {
        const userDataPromises = data.map(item => getFriendData(item.idUser));
        const userDataArray = await Promise.all(userDataPromises);
        return userDataArray;
      }
    }
    const handleAcceptFriend = async (id) =>{
      if (friendList) {
        try {
          friendList.filter(item => item.idFriend === currentUser.id && item.idUser === id && item.statusFriend === 1);

          const response5 = await axios.patch('http://localhost:3004/friend/' + friendList[0].id, {
            statusFriend: 2,
          })
          if (response5.status === 200) {
            navigate('/friendprofile/'+id)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    const handleNotAcceptFriend = async (id) =>{
      if (friendList) {
        try {
          if (window.confirm('Bạn muốn từ chối kết bạn?')) {
            friendList.filter(item => item.idFriend === currentUser.id && item.idUser === id && item.statusFriend === 1);
            const response6 = await axios.delete('http://localhost:3004/friend/' + friendList[0].id)
            if (response6.status === 200) {
              const response1 = await axios.get('http://localhost:3004/friend')
              if (response1.status === 200) {
                setFriendList(response1.data.filter(item => item.idFriend === currentUser.id && item.statusFriend === 1));
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // console.log(friendList);
    useEffect(()=>{
        if (user && user.username) {
            getUserData();
        }
    },[user])
    useEffect(()=>{
      if (currentUser) {
        getListAddFriend();
      }
    },[currentUser])

    useEffect(()=>{
      if (friendList) {
        fetchUserDataForArray(friendList)
        .then(userDataArray => {
          // console.log(userDataArray);
          setFriendListData(userDataArray)
          // userDataArray contains the resolved user data for each idUser
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
      }
    },[friendList])
    // console.log(friendListData);
  return (
    <div>
        <Header />
        <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto shadow-2xl shadow-blue-200'>
            <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                {
                  currentUser && <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>{currentUser.username}</p>
                }
            </div>
            <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'>
            </div>
            <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
                {
                  currentUser && <img className='rounded-[180px] w-44 h-44' src={currentUser.image}></img>
                }
                
            </div>
        </div>
        {friendListData && friendListData.map((item, index)=>(
          <div key={index} className='flex gap-4 w-6/12 my-10 h-[200px] items-center justify-between bg-gray-200 mx-auto rounded-full shadow-2xl shadow-blue-200'>
            <img className="flex w-[21%] h-full bg-blue-200 rounded-full" src={item.image}></img>
            <p className="flex justify-center items-center text-[25px] font-bold ">{item.username}</p>
            <div className="flex flex-col gap-4 w-4/12">
              <div onClick={()=>{handleAcceptFriend(item.id)}} className="flex items-center w-7/12 px-2 py-2 bg-blue-200 cursor-pointer rounded-2xl justify-center shadow-lg shadow-blue-200">Chấp nhận kết bạn</div>
              <div onClick={()=>{handleNotAcceptFriend(item.id)}} className="flex items-center w-7/12 px-2 py-2 bg-red-200 cursor-pointer rounded-2xl justify-center shadow-lg shadow-blue-200">Từ chối kết bạn</div>
            </div>
          </div>
        ))}
    </div>
  )
}

