import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../context/myContext';
import axios from 'axios';



export default function Admin() {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const {user,setUser} = useContext(Context);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const category = ['Users','Posts']
  const [listUser,setListUser] = useState([]);
  const [currentUserPost, setCurrentUserPost] = useState([]);



  const handleLogout = () =>{
    window.localStorage.removeItem('admin');
    navigate('/loginadmin')
  }
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  
  const getListUser = async () =>{
    try {
      const response = await axios.get('http://localhost:3004/user');

      if (response.status === 200) {
        const targetUser2 = response.data.find((item) => item.username === user.adminName);
        setCurrentAdmin(targetUser2);

        if (targetUser2) {
          const list = response.data.filter((item) => item.id !== targetUser2.id && item.username !== "admin");
          setListUser(list);
        }
      }
      const responsePost = await axios.get(
        'http://localhost:3004/posts',
      );
  
      if (responsePost.status === 200) {
        const targetPost = responsePost.data
        // console.log(targetPost)
        setCurrentUserPost(targetPost)
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);
  useEffect(() => {
    if(user && user.username){
      getListUser();
      // console.log(currentUser)
    }
	}, [user])

  const onDeletePost = async (id) =>{
    if (window.confirm('Want delete?')) {
      await axios.delete(`http://localhost:3004/posts/${id}`);
      window.location.reload();
    }
  }

  const onDeleteUser = async (id) =>{
    if (window.confirm('Want delete?')) {
      await axios.delete(`http://localhost:3004/user/${id}`);
      window.location.reload();
    }
  }

  const renderContent = () =>{
    switch (activeSection) {
      case 'Posts':
        return(
          <div>
            <h2 className='text-2xl font-semibold'>Posts</h2>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To do
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUserPost && currentUserPost.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.content}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="rounded-[18px] w-[70px] h-[70px]" src={item.contentImage}></img>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={()=>onDeletePost(item.id)} className="border border-black px-1 py-1 rounded-[10px] mt-2 ml-2 bg-red-200">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'Users':
        return (
          <div>
            <h2 className="text-2xl font-semibold">Users</h2>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Password
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To do
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listUser && listUser.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.password}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="rounded-[18px] w-[70px] h-[70px]" src={item.image}></img>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={()=>onDeleteUser(item.id)}  className="border border-black px-1 py-1 rounded-[10px] mt-2 bg-yellow-200">Remove</button>
                        <button className="border border-black px-1 py-1 rounded-[10px] mt-2 ml-2 bg-red-200">Ban</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );    
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            {/* Dashboard content */}
          </div>
        );
    }
  }
  return (
    <div className="w-full h-[76px] justify-between bg-gray-200">
      {
        user?.username ? (
          <div className='flex flex-col w-full'>
            <div className="w-full flex flex-row h-[76px] justify-between  px-[140px]">
              <div className=" my-2">
                <Link to={'/admin'} className="flex flex-row gap-3">
                  <div onClick={() => handleSectionClick('s')} className='text-[40px] font-bold'>Admin</div>
                </Link>
              </div>
              <div className="flex flex-row gap-[65px] mt-6 mb-6">
                <div>
                  1
                </div>
                <div>
                  2
                </div>
                <div>
                  3
                </div>
              </div>
              <div className="flex flex-row" >
                <img className="my-4" src="./images/Line1.png"></img>
                <div className="flex flex-row gap-4 w-[64px] h-[44px] bg-gray-200 ml-6 mt-4">
                  <img className="rounded-[36px] w-[64px] h-[44px]" src='https://firebasestorage.googleapis.com/v0/b/social-media-23985.appspot.com/o/images%2F1.jpg?alt=media&token=d44dce5c-ee7f-43fe-b9cc-6a338080933f'></img>
                  <p className='mt-2'>{user.adminName}</p>
                  <button onClick={handleLogout} className="rounded-md px-2 py-2 bg-orange-300 text-black text-[16px]">
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="flex container bg-gray-100 h-screen">
            {/* Sidebar */}
              <div className="flex flex-col bg-gray-100 text-black h-screen w-2/12 p-4">
                <ul className='mt-6'>
                  {
                    category && category.map((item, index)=>(
                      <li 
                      key={index}
                      className={`${activeSection === `${item}` ? 'text-black bg-blue-200' : 'text-black bg-gray-300'}
                      hover:text-blue-600 mb-2 px-4 py-4 font-bold rounded-2xl cursor-pointer`}
                      onClick={() => handleSectionClick(`${item}`)}
                      >
                        <a
                          href="#"
                          className='flex justify-center items-center'
                        >
                          {item}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='container flex flex-row'>
                {/* Content */}
                <div className="ml-4 p-8">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
          
        ) : (
          <Link to={'/loginadmin'}>
              <div className='flex mx-auto justify-center items-center'>
                <button className="py-3 px-8 mt-3  rounded-md bg-[#FA8443] text-white">Sign up</button>
              </div>
          </Link>
        )
      }
    </div>
  )
}
