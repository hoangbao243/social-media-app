import React, { useState, useContext, useEffect} from 'react'
import { Context } from '../context/myContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";



export default function LoginAdmin() {
    const [listUser, setListUser] = useState([])
    const {user,setUser} = useContext(Context)
    const navigate = useNavigate();
    let found = false;



    const getUser = async () => {
		const response = await axios.get(
			'https://vtcsyp-5555.csb.app/user',
		);

		if (response.status === 200) {
			setListUser(response.data);
		}
	};

	useEffect(() => {
		getUser();
        
	}, []);

    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value,});
    }
    const handleLogin = () =>{
        listUser.forEach((item)=>{
            if (item.username === user.username && item.password === user.password && item.role === 'admin') {
                setUser({...user, id: item.id})
                return found = true;
            }
        })
        if (found) {
            alert('Login successfull !!')
            window.localStorage.setItem("admin",user.username)
            navigate('/admin');
        }else{
            alert('Username or password is wrong, please try again!!')
        }
    }
  return (
    <div className=' relative flex mx-36 bg-[#0C4195] h-[700px] w-10/12 mt-20 justify-end rounded-r-[22px]'>
        <h1 className='font-bold text-[32px] text-white mt-16 ml-12'>Good Vibes and good life. JoinToday.</h1>
        <img src='./images/Abstraction.png' className='absolute top-[200px] left-0'></img>
        <div className='w-8/12 h-[700px] bg-white rounded-[22px]'>
            <h1 className='font-normal text-[36px] w-32 h-11 mx-auto mt-[30px] mb-[100px]'>Sign in</h1>
            <form class="relative ml-56" onSubmit={handleLogin}>
                <input type="text" name='username' value={user.username} class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} placeholder='Username'></input>
                <input type="password" name='password' value={user.password} class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} placeholder='Password'></input>
                <button type='submit' className='h-[70px] w-6/12 text-white bg-[#0C4195] rounded-[9px] mx-16 mt-8'>Log in</button>
            </form>
        </div>
    </div>
  )
}
