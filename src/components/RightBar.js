import React,{ useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { Context } from '../context/myContext';
import { Link } from "react-router-dom";




export default function RightBar({currentUser}) {
  const [listFriend1, setListFriend1] = useState(null);
  const [listFriend2, setListFriend2] = useState(null);
  const [listFriendData1, setListFriendData1] = useState(null)
  const [listFriendData2, setListFriendData2] = useState(null)
  const {user,setUser} = useContext(Context);
  const [listUser,setListUser] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [dataFetched2, setDataFetched2] = useState(false);
  const [dataFetched3, setDataFetched3] = useState(false);
  const [friendList, setFriendList] = useState(null);
  const [listRecomment, setListRecomment] = useState(null)

  const getListAddFriend = async () =>{
    const response = await axios.get('http://localhost:3004/user')
    if (response.status === 200) {
      setListUser(response.data.filter(item =>item.username !== 'admin' && item.id !== currentUser.id ))
    }
    const response1 = await axios.get('http://localhost:3004/friend')
      if (response.status === 200) {
        const firstData = response1.data.filter(item => item.idFriend === currentUser.id && item.statusFriend === 2);
        const secondData = response1.data.filter(item => item.idUser === currentUser.id && item.statusFriend === 2);
        setListFriend1(firstData)
        setListFriend2(secondData)
        setDataFetched(true);
    }
}
// console.log(listRecomment);
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
  // listRecommentFriend()
  const listRecommentFriend = () =>{
    // console.log('1');
    if (dataFetched && dataFetched2) {
      // console.log('2');
      if (listFriendData1) {
        // console.log('3');
        // const data = [...listFriendData1,...listFriendData2]
        setListRecomment(listUser.filter((item1)=>!listFriendData1.some(item2=>item2.id=== item1.id)))
        setDataFetched3(true);
      }
      if (listFriendData2) {
          // console.log('4');
          if (listRecomment) {
            setListRecomment(listRecomment.filter((item1)=>!listFriendData2.some(item2=>item2.id=== item1.id)))
            setDataFetched3(true);
          }
      }
    }
  } 

useEffect(()=>{
  if (currentUser) {
      getListAddFriend();
  }
},[currentUser])

useEffect(()=>{
  if (dataFetched2) {
    listRecommentFriend()
  }
},[listFriendData1,listFriendData2])
// console.log(friendList);
useEffect(()=>{
    if (user) {
        if (dataFetched) {
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
              setDataFetched2(true)
          }
        }
    }
},[listFriend2])

  return (
    <div className="w-1/4 p-4">
        <div className="flex flex-col gap-4 mt-4 sm:w-full 2xl:w-8/12 h-[650px] mx-auto bg-bg-grey rounded-[18px] shadow-2xl shadow-blue-200 overflow-auto">
          <h1 className="text-[25px] mt-4 mx-auto font-medium">People you may know: </h1>
          {
            dataFetched ? (dataFetched2 ?  (dataFetched3 ? (currentUser?.username && listFriendData1 || listFriendData2 ? (listRecomment && listRecomment.map((item,index)=>(
              <div key={index} className="flex 2xl:flex-row sm:flex-col justify-between rounded-full min-h-[5rem] px-4 py-4 mx-auto my-2 sm:w-11/12 border border-gray">
                  <div className='flex flex-row gap-5 sm:items-center sm:justify-center'>
                      <Link className='flex flex-row gap-4' to={'/friendprofile/' + item.id}>
                          <img className="rounded-full w-[3rem] h-[3rem]" src={item.image}></img>
                      </Link>
                      <p className='flex items-center text-[16px] font-medium'>{item.username}</p>
                  </div>
                  <a className='flex px-2 py-2 justify-center items-center bg-blue-200 rounded-full' href={'/friendprofile/' + item.id}>
                      Connect
                  </a>
              </div>
            ))) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white ml-20 mt-5">Sign up</button>
              </Link>
            )) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white ml-20 mt-5">Sign up</button>
              </Link>
            )) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white ml-20 mt-5">Sign up</button>
              </Link>
            )) : (
              <div></div>
            )
          }
        </div>
    </div>
  )
}
