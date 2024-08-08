import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Context } from '../context/myContext';


export default function Login() {
    const [listUser, setListUser] = useState([])
    const navigate = useNavigate();
    let found = false;
    let id;

    const {user,setUser} = useContext(Context)

    

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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        listUser.forEach((item)=>{
            if (item.username === user.username && item.password === user.password) {
                setUser({...user, id: item.id})
                // console.log(user.id)

                return found = true;
            }
        })
        if (found) {
            // alert('Login successfull !!')
            window.localStorage.setItem("username",user.username)
            navigate('/');
            
            
        }else{
            alert('Username or password is wrong, please try again!!')
            // console.log(listUser)
            // console.log('ssssssssssssssssssssssssssssssssssssssssssssss')
            // console.log(user)

        }
    };
  return (
    <div>
        <div className="w-full flex flex-row xl:h-[76px] justify-center bg-white xl:px-[140px] md:">
            <div className=" my-[18px]">
                <Link to={'/'} className="flex flex-row gap-3">
                <img className="xl:w-[108px] xl:h-[40px]" src="./images/Social.png"></img>
                <div className="flex flex-col xl:w-10 xl:h-10 bg-[#5D5FEF] rounded-[8px] justify-center xl:px-1 xl:py-1 xl:mt-[1px]">
                    <img src="./images/net.png"></img>
                </div>
                </Link>
            </div>
        </div>
        <div className=' relative flex xl:mx-36 bg-[#0C4195] xl:h-[700px] w-10/12 xl:mt-20 justify-end rounded-r-[22px] md:mt-20 md:h-[35rem] md:ml-16 sm:h-[35rem] sm:mt-20 mx-auto'>
            <h1 className='font-bold text-[32px] text-white xl:mt-16 xl:ml-12 md:mt-16 md:ml-10 sm:mt-10 sm:mx-auto sm:px-4'>Good Vibes and good life. JoinToday.</h1>
            <img src='./images/Abstraction.png' className='absolute xl:block xl:top-[200px] left-0 md:hidden sm:hidden'></img>
            <div className='w-8/12 xl:h-[700px] bg-white rounded-[22px]'>
                <h1 className='flex font-normal text-[36px] xl:w-32 xl:h-11 mx-auto xl:mt-[30px] xl:mb-[100px] justify-center items-center md:mt-10 sm:mt-6'>Sign in</h1>
                <form className="relative xl:ml-56 md:ml-20 md:mt-10 sm:mt-10" onSubmit={handleSubmit}>
                    <input type="text" name='username' value={user.username} className="md:w-8/12 p-4 border-b-2 sm:w-full border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} placeholder='Username' required></input>
                    <input type="password" name='password' value={user.password} className="md:w-8/12 p-4 border-b-2 sm:w-full border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} placeholder='Password' required></input>
                    <button type='submit' className='xl:h-[70px] w-6/12 text-white bg-[#0C4195] rounded-[9px] xl:mx-16 xl:mt-8 md:h-10 sm:h-8 sm:ml-8 sm:mx-auto'>Log in</button>
                </form>
                <div className='mt-4 flex xl:flex-row gap-2 xl:ml-56 md:ml-10 sm:flex-col md:flex-col'>
                    <p>Don’t have an account? </p>
                    <Link className='text-[blue]' to={'/register'}>
                        Get one here.
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
