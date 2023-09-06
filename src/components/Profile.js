import React, { useContext, useState, useEffect } from "react";
import { Context } from '../context/myContext';
import axios from 'axios';
import Header from "./Header";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import { Link } from "react-router-dom";



export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const {user,setUser} = useContext(Context);
  const [currentUserPost, setCurrentUserPost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);



  const getUser = async () => {
    try {
      //get user
      const response = await axios.get(
        'http://localhost:3004/user',
      );

      if (response.status === 200) {
        // console.log(111111)
        const targetUser2 = response.data.find(item => item.username === user.username);
            setCurrentUser(targetUser2)
            const responsePost = await axios.get(
              'http://localhost:3004/posts',
            );
            if (responsePost.status === 200) {
              // console.log(222222)
              const targetPost = responsePost.data;
                setCurrentUserPost(targetPost.filter(item=>item.userId === targetUser2.id))
              
            }
      }
      //get post
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataFetched(true); // Indicate that data fetching is complete
    }
	};

  // console.log(222222)

  useEffect(() => {
    if(user && user.username){
      getUser();
    }
	}, [user])
  return (
    <div>
        <Header />
        <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto'>
            <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                
                  {
                    currentUser && (
                      <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>{currentUser.username}</p>
                    )
                  }
                
            </div>
            <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'></div>
            <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
              {
                currentUser && (
                  <img className='rounded-[180px] w-44 h-44' src={currentUser.image}></img>
                )
              }
                
            </div>
        </div>
        <div className='w-6/12 my-4 h-[200px] mx-auto'>
        {
            dataFetched ? (currentUser?.username ? (currentUserPost.map((item,index)=>(
              <div key={index} className=" flex flex-col bg-white w-11/12 mx-auto min-h-[168px]  rounded-[16px] mb-6">
                <div className="flex flex-row gap-4">
                  <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                  {
                    item.user && <img className="rounded-[18px] w-[44px] h-[44px]" src={item.user.image}></img>
                  }
                    
                  </div>
                  <div className="mx-2 font-bold text-[17px] mt-6">
                    {item.user && item.user.username}
                  </div>
                </div>
                <div className="ml-9 mt-4 min-h-[28px] w-10/12 mb-4">
                  {item.content}
                </div>
                <div className="h-80 w-12/12 rounded-[18px] mx-4 mb-4">
                  <img className="w-full max-h-80" src={item.contentImage}></img>
                </div>
                <div className="flex flex-row gap-4 ml-6 mb-4">
                  <img className="w-8 h-8" src={like}></img>
                  <img className="w-8 h-8" src={comment}></img>
                </div>
                <div className="flex flex-row bg-grey-rgba min-h-[62px] w-12/12 mb-4 mx-4 rounded-[18px] px-2 py-2">
                  <textarea name="postContent" className="min-h-[42px] w-11/12 px-4 py-4 rounded-[18px] bg-grey-rgba"/>
                  <img src={plus} className="cursor-pointer ml-6"></img>
                </div>
              </div>
            ))) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white">Sign up</button>
              </Link>
            )) : (
              <p>Loading...</p>
            )
          }
        </div>
    </div>
  )
}
