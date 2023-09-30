import React, { useEffect, useState, useLocation,useContext } from 'react'
import Header from './Header'
import { useParams,Link } from 'react-router-dom'
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import axios from 'axios'
import { Context } from '../context/myContext';
import settings from "../svg/settings.svg"



export default function Status() {
    const [currentUser, setCurrentUser] = useState(null);
    const {user,setUser} = useContext(Context);
    const idPost = useParams();
    const [post , setPost] = useState({})
    const [commentPost, setCommentPost] = useState('')
    const currentDate = new Date().toLocaleString();



    const getPost = async () => {
        const responsePost = await axios.get(
                'http://localhost:3004/posts',
            );

            if (responsePost.status === 200) {
                const targetPost = responsePost.data.find(item=>item.id == idPost.id)
                // console.log(targetPost)
                setPost(targetPost)
            }
	};
    
    const getUser = async () => {
		const response = await axios.get(
			'http://localhost:3004/user',
		);

		if (response.status === 200) {
            const targetUser2 = response.data.find(item => item.username === user.username)
            setCurrentUser(targetUser2)
		}
	};
    // console.log(currentUser);
    const handleComment = async () =>{
        const response = await axios.patch('http://localhost:3004/posts/' + idPost.id,{
            comment: [...post.comment, {commentContent: commentPost, time: currentDate, userComment: currentUser}],///sai, get list posts => bo vao comment
            });
        if (response.status == 200) {
            setCommentPost('');
            const responsePost = await axios.get('http://localhost:3004/posts/' + idPost.id);
            setPost(responsePost.data)
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
          const responsePost = await axios.get('http://localhost:3004/posts/' + idPost.id);
            setPost(responsePost.data)
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
          const responsePost = await axios.get('http://localhost:3004/posts/' + idPost.id);
            setPost(responsePost.data)
        }
      }
    useEffect(() => {
        if(user && user.username){
          getUser();
          // console.log(user)
        }
        }, [user])
    useEffect(()=>{
        getPost();
    },[])
    console.log(post);
  return (
    <div className=''>
        <Header/>
        <div className="flex flex-col bg-white w-6/12 mx-auto h-full mt-4 rounded-[16px] mb-6 shadow-2xl shadow-blue-200">
            <div className="flex flex-row gap-4 relative">
                <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                {
                post.user && <img className="rounded-full w-[44px] h-[44px]" src={post.user.image}></img>
                }
                
                </div>
                <div className="mx-2 mt-4">
                  <p className='font-bold text-[17px]'>{post.user && post.user.username}</p>
                  <p>{post.user && post.createAt}</p>
                </div>
                {
                  currentUser && post.userId === currentUser.id && (
                    <Link to={'/updatestatus/' + post.id}>
                      <img className="absolute w-9 h-9 right-7 top-4 cursor-pointer" src={settings}></img>
                    </Link>
                  )
                }
            </div>
            <div className="ml-9 mt-4 min-h-[28px] w-10/12 mb-4">
                {post.content}
            </div>
            {
              post.contentImage && (<div className="min-h-[15rem] w-12/12 rounded-[18px] mx-4 mb-4">
                <img className="w-full max-h-[40rem] rounded-xl" src={post.contentImage}></img>
              </div>)
            }
            <div className="flex flex-row relative gap-4 ml-6 mb-4">
                  <div className="relative">
                    <img className="w-8 h-8 cursor-pointer " onClick={()=>handleLike(post.id)} src={like}></img>
                    {
                        post.numLike > 0 && <p className="absolute bg-blue-300 px-[0.4rem]  rounded-full top-[-5px] right-[-0.75rem]">{post.numLike}</p>
                    }
                  </div>
            </div>
            <div className="flex flex-row bg-grey-rgba min-h-[62px] w-12/12 mb-4 mx-4 rounded-[18px] px-2 py-2">
                  <textarea name="postContent" value={commentPost} onChange={e=>setCommentPost(e.target.value)} className="min-h-[32px] w-11/12 px-4 py-4 rounded-[18px] bg-grey-rgba"/>
                  <img src={plus} onClick={()=>handleComment()} className="cursor-pointer ml-6"></img>
            </div>
                {
                    post.comment && post.comment.map((item)=>(
                        <div key={item.id} className="flex flex-row min-h-[62px] w-12/12 mb-4 mx-4 rounded-[18px] px-2 py-2">
                            <div className='flex gap-4'>
                                {
                                   item.userComment && (
                                        <div className='flex flex-col items-center'>
                                            <img className="rounded-full w-[44px] h-[44px]" src={item.userComment.image}></img>
                                            <p className='text-[16px] font-medium'>{item.userComment.username}</p>
                                        </div>
                                   )
                                }
                                <div className='flex bg-gray-200 rounded-[18px] py-2 px-3 items-center shadow-lg'>
                                    <div className='w-32 '>
                                        <p className=''>{item.time}</p>
                                    </div>
                                    <div className=''>{item.commentContent}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
        </div>
    </div>
  )
}
