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
    const id = useParams();
    const [dataUserFriend, setDataUserFriend] = useState(null);
    const {user,setUser} = useContext(Context)
    const [currentUser, setCurrentUser] = useState(null);
    const [friendPost, setFriendPost] = useState([])
    const [textFriend, setTextFriend] = useState('Thêm bạn bè');
    const [currentFriend, setCurrentFriend] = useState(null);
    const navigate = useNavigate();

    const getFriendData = async () =>{
        const response = await axios.get('https://vtcsyp-5555.csb.app/user');
        if (response.status === 200) {
            const dataFriend = response.data.find(item=>item.id == id.id);
            // console.log(dataFriend);
            setDataUserFriend(dataFriend);
            const curUser = response.data.find(item => item.username === user.username)
            setCurrentUser(curUser);
            // console.log(curUser);
            const response3 = await axios.get('https://vtcsyp-5555.csb.app/friend');

            if (response3.status === 200) {
                    // console.log('1');
                if (curUser && dataFriend && response3.data.some(item => item.idUser === curUser.id && item.idFriend === dataFriend.id && item.statusFriend === 1)) {
                    setTextFriend('Hủy lời mời')
                    // console.log('2');
                }else if (curUser && dataFriend && response3.data.some(item => item.idFriend === curUser.id && item.idUser === dataFriend.id && item.statusFriend === 2 || item.idFriend === dataFriend.id && item.idUser === curUser.id && item.statusFriend === 2)) {
                    setTextFriend('Hủy kết bạn')
                    // console.log('3');
                }else if (curUser && dataFriend && response3.data.some(item => item.idUser === dataFriend.id && item.idFriend === curUser.id && item.statusFriend === 1)) {
                    setTextFriend('Phản hồi kết bạn')
                    // console.log('4');
                }
            }
            // if (curUser) {
            //     // console.log('1');
            //     if (curUser.friend.some((item)=> item.friendData.id === dataFriend.id && item.stateFriend === 1)) {
            //         setTextFriend('Hủy lời mời')
            //         // console.log('2');
                    
            //     }
            // }
            
            const responsePost = await axios.get(
            'https://vtcsyp-5555.csb.app/posts',
            );
            if (responsePost.status === 200) {
                const friendPost = responsePost.data.filter(item=>item.userId == id.id);
                setFriendPost(friendPost);
            }
        }
    }
    // console.log(dataUserFriend);
    const handleAddFriend = async () =>{
        // if (textFriend === 'Thêm bạn bè') {
        //     dataUserFriend.friend.push({
        //         friendData: {username: currentUser.username, email: currentUser.email, image: currentUser.image, id: currentUser.id},
        //         stateFriend: 2,
        //     });
        //     const response = await axios.patch('https://vtcsyp-5555.csb.app/user/' + dataUserFriend.id, dataUserFriend);

        //     currentUser.friend.push({
        //         friendData: {username: dataUserFriend.username, email: dataUserFriend.email, image: dataUserFriend.image, id: dataUserFriend.id},
        //         stateFriend: 1,
        //     });
        //     if (response.status === 200) {
        //         const response1 = await axios.patch('https://vtcsyp-5555.csb.app/user/' + currentUser.id, currentUser);
        //         if (response1.status === 200) {
        //             setTextFriend('Hủy lời mời')
        //         }
        //     }
        // }else if (textFriend === 'Hủy lời mời') {
        //     const userIndex = dataUserFriend.friend.findIndex(friend=>friend.friendData.id === currentUser.id)
        //     if (userIndex !== -1) {
        //         if (dataUserFriend.friend[userIndex].stateFriend === 1 || dataUserFriend.friend[userIndex].stateFriend === 2) {
        //             dataUserFriend.friend.splice(userIndex,1);
        //         }
        //         const response2 = await axios.patch('https://vtcsyp-5555.csb.app/user/' + dataUserFriend.id, dataUserFriend);
        //         if (response2.status === 200) {
        //             const friendIndex = currentUser.friend.findIndex(friend=>friend.friendData.id === dataUserFriend.id)
        //             if (friendIndex !== -1) {
        //                 if (currentUser.friend[friendIndex].stateFriend === 1 || currentUser.friend[friendIndex].stateFriend === 2) {
        //                     currentUser.friend.splice(friendIndex,1);
        //                 }
        //                 const response3 = await axios.patch('https://vtcsyp-5555.csb.app/user/' + currentUser.id, currentUser);
        //                 if (response3.status === 200) {
        //                     setTextFriend('Thêm bạn bè')
        //                 }
        //             }
        //         }
        //     }
            
            
        // }
        if (textFriend === 'Thêm bạn bè') {
            const dataFriendRelationship = {
                idUser: currentUser.id,
                idFriend: dataUserFriend.id,
                statusFriend: 1,
            }
            const response = await axios.post('https://vtcsyp-5555.csb.app/friend/', dataFriendRelationship);
            if (response.status === 201) {
                setTextFriend('Hủy lời mời')
            }
        }else if (textFriend === 'Hủy lời mời') {
            const response1 = await axios.get('https://vtcsyp-5555.csb.app/friend');
            if (response1.status === 200) {
                const idFriendRelationShip = response1.data.find(item => {return item.idFriend === dataUserFriend.id}).id;
                console.log(idFriendRelationShip);
                if (window.confirm('Bạn muốn hủy lời mời?')) {
                    const response2 = await axios.delete('https://vtcsyp-5555.csb.app/friend/' + idFriendRelationShip)
                    if (response2.status === 200) {
                        setTextFriend('Thêm bạn bè');
                    }
                }
                
            }
        }else if (textFriend === 'Hủy kết bạn') {
            const response2 = await axios.get('https://vtcsyp-5555.csb.app/friend');
            if (response2.status === 200) {
                const idFriendRelationShip = response2.data.find(item => {return item.idFriend === dataUserFriend.id && item.idUser === currentUser.id || item.idFriend === currentUser.id && item.idUser === dataUserFriend.id}).id;
                console.log(idFriendRelationShip);
                if (window.confirm('Bạn muốn hủy kết bạn?')) {
                    const response2 = await axios.delete('https://vtcsyp-5555.csb.app/friend/' + idFriendRelationShip)
                    if (response2.status === 200) {
                        setTextFriend('Thêm bạn bè');
                    }
                }
                
            }
        }else if (textFriend === 'Phản hồi kết bạn') {
            navigate('/friends')
        }
    }
    // if (currentUser) {
    //     console.log(currentUser.id);
    // }
    useEffect(()=>{
        if (user) {
            getFriendData();
        }
    },[user])
  return (
    <div>
        <Header />
        <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto shadow-2xl shadow-blue-200'>
            <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                {
                    dataUserFriend && <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>{dataUserFriend.username}</p>
                }
            </div>
            <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'>
                <div className="absolute right-7 bottom-3 bg-blue-500 hover:bg-blue-400 cursor-pointer text-white p-3 rounded-xl ">
                 <div onClick={()=>handleAddFriend()}>{textFriend}</div>
                </div>
            </div>
            <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
                {
                    dataUserFriend && <img className='rounded-[180px] w-44 h-44' src={dataUserFriend.image}></img>
                }
                
            </div>
        </div>
        <div className='w-6/12 my-4 h-[200px] mx-auto '>
            {
                user?.username ? (friendPost.map((item,index)=>(
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
                )
            }
        </div>
    </div>
  )
}
