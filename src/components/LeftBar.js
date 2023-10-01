import React, { useEffect, useState, useContext } from 'react'
import friend from "../svg/friend.svg"
import chat from "../svg/chat.svg"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../context/myContext';

export default function LeftBar({currentUser}) {
    const [listFriend1, setListFriend1] = useState(null);
    const [listFriend2, setListFriend2] = useState(null);
    const [listFriendData1, setListFriendData1] = useState(null)
    const [listFriendData2, setListFriendData2] = useState(null)
    const [friend, setFriend] = useState(null)
    const [dataFetched, setDataFetched] = useState(false);
    const {user,setUser} = useContext(Context);
    


    const getListAddFriend = async () =>{
        const response = await axios.get('http://localhost:3004/friend')
          if (response.status === 200) {
            const firstData = response.data.filter(item => item.idFriend === currentUser.id && item.statusFriend === 2);

            const secondData = response.data.filter(item => item.idUser === currentUser.id && item.statusFriend === 2);
            setListFriend1(firstData)
            setListFriend2(secondData)
        }
    }
// console.log(list);
    const getFriendData = async (id) =>{
        try {
            const response4 = await axios.get('http://localhost:3004/user/' + id);
            return response4.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const fetchUserDataForArrayIdUser = async (data) => {
        if (data) {
          const userDataPromises = data.map(item => getFriendData(item.idUser));
          const userDataArray = await Promise.all(userDataPromises);
          return userDataArray;
        }
    }
    const fetchUserDataForArrayIdFriend = async (data) => {
        if (data) {
          const userDataPromises = data.map(item => getFriendData(item.idFriend));
          const userDataArray = await Promise.all(userDataPromises);
          return userDataArray;
        }
    }
    // console.log(listFriend1);

    useEffect(()=>{
        if (currentUser) {
            getListAddFriend();
        }
    },[currentUser])
    useEffect(()=>{
        if (user) {
            try {
                if (listFriend1) {
                    fetchUserDataForArrayIdUser(listFriend1)
                    .then(userDataArray => {
                    // console.log(userDataArray);
                    setListFriendData1(userDataArray)
                    // userDataArray contains the resolved user data for each idUser
                    })
                    .catch(error => {
                    console.error("Error fetching user data:", error);
                    });
                }
                if (listFriend2) {
                    fetchUserDataForArrayIdFriend(listFriend2)
                    .then(userDataArray => {
                    // console.log(userDataArray);
                    setListFriendData2(userDataArray)
                    // userDataArray contains the resolved user data for each idUse
                    })
                    .catch(error => {
                    console.error("Error fetching user data:", error);
                    });
                }
            } catch (error) {
                console.log(error);
            } finally{
                setDataFetched(true)
            }
        }
    },[listFriend2])
  return (
    <div className="flex flex-col mt-4 2xl:w-8/12 h-[550px] mx-auto bg-bg-grey rounded-[18px] shadow-2xl shadow-blue-200 overflow-auto">
        <h1 className="text-[25px] mt-4 mx-auto">List Friend</h1>
        {
            dataFetched ? (user?.username ? listFriendData1 && listFriendData1.map((item, index)=>
                <div key={index} className="flex 2xl:flex-row sm:flex-col justify-between rounded-full min-h-[5rem] px-4 py-4 mx-auto my-2 sm:w-11/12 border border-gray">
                            <div className='flex flex-row gap-5 sm:items-center sm:justify-center'>
                                <Link className='flex flex-row gap-4' to={'/chatid/' + item.id}>
                                    <img className="rounded-full w-[3rem] h-[3rem]" src={item.image}></img>
                                </Link>
                                <p className='flex items-center text-[16px] font-medium'>{item.username}</p>
                            </div>
                            <a className='flex px-2 py-2 justify-center items-center bg-blue-200 rounded-full' href={'/friendprofile/' + item.id}>
                                Message
                            </a>
                        </div>
            ) : (
                <Link to={'/login'}>
                    <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white ml-20 mt-5">Sign up</button>
                </Link>
            )) : (
                <p>loading...</p>
            )
        }
        {
            dataFetched ? (user?.username ? listFriendData2 && listFriendData2.map((item, index)=><div key={index} className="flex 2xl:flex-row sm:flex-col justify-between gap-4 rounded-full min-h-[5rem] px-4 py-4 mx-auto my-2 w-11/12 border border-gray">
                            <div className='flex flex-row gap-5'>
                                <Link className='flex flex-row gap-4' to={'/chatid/' + item.id}>
                                    <img className="rounded-full w-[3rem] h-[3rem]" src={item.image}></img>
                                </Link>
                                <p className='flex items-center text-[16px] font-medium'>{item.username}</p>
                            </div>
                            <a className='flex px-2 py-2 justify-center items-center bg-blue-200 rounded-full' href={'/chatid/' + item.id}>
                                Message
                            </a>
                        </div>
            
            ) : (
                <p></p>
            )) : (
                <p>loading...</p>
            )
        }
    </div>
  )
}
