import React,{ useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { Context } from '../context/myContext';
import { Link } from "react-router-dom";




export default function RightBar() {
  const [currentUser, setCurrentUser] = useState(null);
  const {user,setUser} = useContext(Context);
  const [listUser,setListUser] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const listRecommentUser = async () => {
		try {
      const response = await axios.get('http://localhost:3004/user');

      if (response.status === 200) {
        const targetUser2 = response.data.find((item) => item.username === user.username);
        setCurrentUser(targetUser2);

        if (targetUser2) {
          const list = response.data.filter((item) => item.id !== targetUser2.id);
          setListUser(list);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataFetched(true); // Indicate that data fetching is complete
    }
	};

  useEffect(() => {
    if (user) {
      listRecommentUser();
    }
	}, [user])

  

  return (
    <div class="w-1/4 p-4">
        <div className="flex flex-col mt-4 w-[278px] min-h-[500px] ml-6 bg-bg-grey rounded-[18px]">
          <h1 className="text-[25px] mt-4 mx-auto text-[18px] font-medium">People you may know: </h1>
          {
            dataFetched ? (currentUser?.username ? (listUser.map((item)=>(
              <div key={item.id}>
                <div className="flex flex-row h-[53px] rounded-[16px] w-11/12 border border-gray-300 mx-auto my-2">
                  <div className="rounded-[18px] w-[44px] h-[44px] ml-4 my-auto">
                      <img className='w-[44px] h-[44px] rounded-[18px]' src={item.image}></img>
                  </div>
                  <p className="font-medium text-[16px] my-auto mx-2">{item.username}</p>
                  <div className="flex justify-center text-text-blue border-solid border border-blue-300 bg-blue-100 w-16 h-8 rounded-[8px] my-auto ml-6">connect</div>
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
