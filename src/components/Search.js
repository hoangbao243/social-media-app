import axios from "axios";
import Header from "./Header";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/myContext";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import { Link } from "react-router-dom";

export default function Search() {
    const {user,setUser} = useContext(Context);
    const [currentUser, setCurrentUser] = useState(null);
    const searchInput = useParams();
    const off = 1;
    const [searchResults, setSearchResults] = useState([]);
    const [userData, setUserData] = useState(null);
    const [fetchData, setFetchData] = useState(false);
    const navigate = useNavigate();
    // console.log(searchInput.stringParam);
    
    const getUserData = async () =>{
        const response = await axios.get('https://vtcsyp-5555.csb.app/user');
        if (response.status === 200) {
            const curUser = response.data.find(item => item.username === user.username);
            setCurrentUser(curUser);
            setUserData(response.data.filter((item=>item.id !== curUser.id)))
            setFetchData(true)
        }
    }
    const handleSearch = () => {
        const filteredResults = userData.filter((user) =>
          user.username.toLowerCase().includes(searchInput.stringParam.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.stringParam.toLowerCase())
        );
        setSearchResults(filteredResults);
        // console.log(filteredResults);
    };
    const connect = (id) =>{
        navigate('friendprofile/'+id)
    }
    useEffect(()=>{
        if (user && user.username) {
            getUserData();
        }
    },[user])
    useEffect(()=>{
        if (fetchData) {
            handleSearch()
        }
    },[userData])
  return (
    <div>
        <Header off={off}/>
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
        {searchResults && searchResults.map((item, index)=>(
          <div key={index} className='flex gap-4 w-6/12 my-10 h-[200px] items-center justify-between bg-gray-200 mx-auto rounded-full shadow-2xl shadow-blue-200'>
            <img className="flex w-[21%] h-full bg-blue-200 rounded-full" src={item.image}></img>
            <p className="flex justify-center items-center text-[25px] font-bold ">{item.username}</p>
            <div className="flex flex-col gap-4 w-4/12">
                <Link to={'/friendprofile/' + item.id}>
                    <div className="flex items-center w-7/12 px-2 py-2 bg-blue-300 cursor-pointer rounded-2xl justify-center shadow-lg shadow-blue-200">Trang cá nhân</div>
                </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

