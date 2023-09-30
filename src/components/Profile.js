import React, { useContext, useState, useEffect } from "react";
import { Context } from '../context/myContext';
import axios from 'axios';
import Header from "./Header";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import settings from "../svg/settings.svg"
import plus from "../svg/plus.svg"
import { Link, useNavigate } from "react-router-dom";



export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const {user,setUser} = useContext(Context);
  const [currentUserPost, setCurrentUserPost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  const [commentPost, setCommentPost] = useState('');
  const currentDate = new Date().toLocaleString();




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

  const handleComment = async (item) =>{
    const response = await axios.patch('http://localhost:3004/posts/' + item.id,{
      comment: [...item.comment, {commentContent: commentPost, time: currentDate, userComment: currentUser}],///sai, get list posts => bo vao comment
      });
    if (response.status == 200) {
      setCommentPost('');
      navigate('status/' + item.id)
    }
  }

  const handleLike = async (id) =>{
    const response = await axios.get('http://localhost:3004/posts/' + id);
    const dataLike = response.data;
    if (dataLike.like.some(item=>{return item.idLikeUser === currentUser.id})) {
      const newDataLike = response.data.like.filter(item=>item.idLikeUser !== currentUser.id);
      const dataPost = {
        content: dataLike.content,
        contentImage: dataLike.contentImage,
        userId: dataLike.userId,
        user: dataLike.user,
        like: newDataLike,
        comment: dataLike.comment,
        id: dataLike.id,
        numLike: dataLike.like.length-1,
      }
      await axios.put('http://localhost:3004/posts/' + id, dataPost);
      const response3 = await axios.get('http://localhost:3004/posts/');
      setCurrentUserPost(response3.data.reverse())
      // console.log('1');
      // console.log(newDataLike);
    }else{
      const response = await axios.get('http://localhost:3004/posts/' + id);
      const dataLike = response.data.like;
      const dataLikeUser = {
        username: currentUser.username,
        idLikeUser: currentUser.id,
        image: currentUser.image,
      }
      const response1 = await axios.patch('http://localhost:3004/posts/' + id, {
        like: [...dataLike, dataLikeUser],
        numLike: dataLike.length+1,
      });
      // console.log(response1.data);
      const response3 = await axios.get('http://localhost:3004/posts/');
      setCurrentUserPost(response3.data.reverse())
    }
  }

  useEffect(() => {
    if(user && user.username){
      getUser();
    }
	}, [user])
  return (
    <div>
        <Header />
        {
          currentUser?.username ? (
            <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto shadow-2xl shadow-blue-200'>
              <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                  
                    {
                      currentUser && (
                        <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>{currentUser.username}</p>
                      )
                    }
                  
              </div>
              <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'>
                <Link to={'/updateprofile/' + currentUser.id}>
                  <img className="absolute w-9 h-9 right-7 bottom-5 cursor-pointer" src={settings}></img>
                </Link>
              </div>
              <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
                {
                  currentUser && (
                    <img className='rounded-[180px] w-44 h-44' src={currentUser.image}></img>
                  )
                }
                  
              </div>
            </div>
          ) : (
            <div className="">
            </div>
          )
        }
        <div className='w-6/12 my-4 h-[200px] mx-auto '>
        {
            dataFetched ? (currentUser?.username ? (currentUserPost.map((item,index)=>(
              <div key={index} className=" flex flex-col bg-white w-11/12 mx-auto min-h-[168px]  rounded-[16px] mb-6 shadow-2xl shadow-blue-200">
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
                { item.contentImage &&
                  (<div className="min-h-[15rem] w-12/12 rounded-[18px] mx-4 mb-4">
                    <img className="w-full max-h-[40rem] rounded-xl" src={item.contentImage}></img>
                  </div>)
                }
                <div className="flex flex-row relative gap-4 ml-6 mb-4">
                  <div className="relative">
                    <img className="w-8 h-8 cursor-pointer " onClick={()=>handleLike(item.id)} src={like}></img>
                    {
                      item.numLike > 0 && <p className="absolute bg-blue-300 px-[0.4rem]  rounded-full top-[-5px] right-[-0.75rem]">{item.numLike}</p>
                    }
                  </div>
                  <div className="relative">
                    <Link to={'/status/' + item.id}>
                      <img className="w-8 h-8" src={comment}></img>
                        {
                        item.comment.length > 0 && <p className="absolute bg-blue-300 px-[0.4rem]  rounded-full top-[-5px] right-[-0.75rem]">{item.comment.length}</p>
                        }
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row bg-grey-rgba min-h-[62px] w-12/12 mb-4 mx-4 rounded-[18px] px-2 py-2">
                  <textarea name="postContent" value={commentPost} onChange={e=>setCommentPost(e.target.value)} className="min-h-[32px] w-11/12 px-4 py-4 rounded-[18px] bg-grey-rgba"/>
                  <img src={plus} onClick={()=>handleComment(item)} className="cursor-pointer ml-6"></img>
                </div>
              </div>
            ))) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white">Sign up</button>
              </Link>
            )) : (
              <Link to={'/login'}>
                <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white">Sign up</button>
              </Link>
            )
          }
        </div>
    </div>
  )
}
