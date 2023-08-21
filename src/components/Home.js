import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import photo from "../svg/photo.svg";
import send from "../svg/send.svg";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import { Context } from '../context/myContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";




function Home() {
  const [currentUser, setCurrentUser] = useState([]);
  const {user,setUser} = useContext(Context);
  const navigate = useNavigate();

  const getUser = async () => {
		const response = await axios.get(
			'http://localhost:3004/user',
		);

		if (response.status === 200) {
      const targetUser2 = response.data.find(item => item.username === user.username)
          setCurrentUser(targetUser2)
		}
	};

	useEffect(() => {
    if(user){
      getUser();
      // console.log(currentUser)
    }
	}, [user])

  const handleLogout = () =>{
    window.localStorage.removeItem('username');
    navigate('/login')
  }

  return (
    <div>
      <Header />
      <div class="flex min-h-screen">
        <div class=" w-1/4 p-4">
          <div className="flex flex-col w-[278px] h-[168px] mt-4 ml-36 bg-bg-grey rounded-[18px]">
            <div className="flex flex-row gap-4">
              
              {
                currentUser?.username ? (
                  <div>
                    <div className="rounded-[18px] w-[44px] h-[44px] bg-bg-grey ml-6 mt-4">
                      <img className="rounded-[18px] w-[44px] h-[44px]" src={currentUser.image}></img>
                    </div>
                    <div className="mt-6 font-bold text-[17px]">
                      {currentUser.username}
                    </div>
                    
                  </div>

                ) : (
                  <Link to={'/login'}>
                      <button className="py-3 px-8 rounded-md bg-[#FA8443] text-white">Sign up</button>
                  </Link>
                )
              }
            </div>
            <div className="ml-6 mt-2 text-[blue]">
              My post: 10
            </div>
            <button onClick={handleLogout} className="py-3 px-3 rounded-md bg-[#FA8443] text-white">
                Logout
            </button>
          </div>
          <div className="flex flex-col mt-4 w-[278px] min-h-[500px] ml-36 bg-bg-grey rounded-[18px]">
            <h1 className="text-[25px] mt-4 mx-auto">Category</h1>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
        <div class="flex-1 p-4 ">
          <div className="flex flex-col bg-white w-11/12 mx-auto min-h-[168px] rounded-[16px] mb-6">
            <div className="flex">
              <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                <img src="./images/avatar.png"></img>
              </div>
              <div className="flex flex-col w-full">
                <textarea name="postContent" className="min-h-[103px] w-11/12 px-4 py-4"/>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex flex-row w-full bg-light-blue-rgba h-[70px] gap-4 rounded-bl-2xl">
                <img src={photo} className="mt-[22px] ml-[35px] w-[21px] h-[24px]"></img>
                <p className="text-[16px] mt-[22px]">Photo</p>
              </div>
              <div className="flex justify-center items-center bg-morelight-blue-rgba w-[77px] h-[70px] rounded-br-2xl">
                  <img className="w-[24px] h-[24px] cursor-pointer" src={send}></img>
              </div>
            </div>
          </div>
          <div className=" flex flex-col bg-white w-11/12 mx-auto min-h-[168px] rounded-[16px]">
            <div className="flex flex-row gap-4">
              <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                <img src="./images/avatar.png"></img>
              </div>
              <div className="mx-2 font-bold text-[17px] mt-6">
                Bão Hoàng
              </div>
            </div>
            <div className="ml-9 mt-4 min-h-[28px] w-10/12 bg-red-200 mb-4">
              Travel App Designssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssss
            </div>
            <div className="h-80 w-12/12 rounded-[18px] mx-4 mb-4">
              <img className="w-full h-80" src="./images/Rectangle 22.png"></img>
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
          
        </div>
        <div class="w-1/4 p-4">
          <div className="flex flex-col mt-4 w-[278px] min-h-[500px] ml-6 bg-bg-grey rounded-[18px]">
            <h1 className="text-[25px] mt-4 mx-auto text-[18px] font-medium">People you may know: </h1>
            <div>
              <div className="flex flex-row">
                <div className="rounded-[18px] w-[44px] h-[44px] bg-bg-grey ml-6 mt-4">
                  <img src="./images/avatar.png"></img>
                </div>
                <p className="font-medium text-[16px] mt-6 mx-2">hoang bao</p>
                <div className="flex justify-center text-text-blue border-solid border border-blue-600 w-16 h-8 rounded-[8px] mt-6 ml-6">connect</div>
              </div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
