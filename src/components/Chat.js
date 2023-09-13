import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { Context } from '../context/myContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import RightBar from "./RightBar";

export default function Chat() {
    const [currentUser, setCurrentUser] = useState(null);
    const {user,setUser} = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () =>{
        window.localStorage.removeItem('username');
        navigate('/login')
    }

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
          }
          //get post
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        };
    
    useEffect(() => {
        if(user && user.username){
            getUser();
        }
    }, [user])
  return (
    <div>
      <Header />
      <div class="flex min-h-screen">
        <div class=" w-1/4 p-4">
          <div className="flex flex-col w-[278px] h-[168px] mt-4 ml-36 bg-bg-grey rounded-[18px]">
            <div className="flex flex-row gap-4">
              
              {
                currentUser?.username ? (
                  <div className="flex flex-col w-[278px] h-[168px]">
                    <div className="flex flex-row gap-4">
                      <div className="rounded-[18px] w-[44px] h-[44px] bg-bg-grey ml-6 mt-4">
                        <img className="rounded-[18px] w-[44px] h-[44px]" src={currentUser.image}></img>
                      </div>
                      <div className="mt-6 font-bold text-[17px]">
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
                      <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white">Sign up</button>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
        <div class="flex-1 p-4 mt-8 w-[200px] h-[200px] bg-red-200 rounded-xl">
          
          
        </div>
        <RightBar />
      </div>
    </div>
  )
}
