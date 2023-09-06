import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import photo from "../svg/photo.svg";
import send from "../svg/send.svg";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import LeftBar from "./LeftBar";
import { Context } from '../context/myContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import RightBar from "./RightBar";
import {storage} from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserPost, setCurrentUserPost] = useState([]);
  const {user,setUser} = useContext(Context);
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [contentImage, setContentImage] = useState(null);
  const metadata = {contentType: 'image/jpeg',};
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store


  const getUser = async () => {
		const response = await axios.get(
			'http://localhost:3004/user',
		);

		if (response.status === 200) {
      const targetUser2 = response.data.find(item => item.username === user.username)
          setCurrentUser(targetUser2)
		}

    const responsePost = await axios.get(
			'http://localhost:3004/posts',
		);

		if (responsePost.status === 200) {
      const targetPost = responsePost.data
      // console.log(targetPost)
      setCurrentUserPost(targetPost)
		}
	};

  

	useEffect(() => {
    if(user){
      getUser();
      // console.log(currentUser)
    }
	}, [user])

  // useEffect(()=>{
  //   console.log(content)
  // },[content])

  const handleLogout = () =>{
    window.localStorage.removeItem('username');
    navigate('/login')
  }

  // const uploadImage = async (e) =>{
  //     const file = e.target.files[0];
  //     const base64 = await convertBase64(file);
  //     setContentImage(base64)
  // }

  // const convertBase64 = (file) =>{
  //     return new Promise((resolve,reject)=>{
  //         const fileReader = new FileReader();
  //         fileReader.readAsDataURL(file);

  //         fileReader.onload = () =>{
  //             resolve(fileReader.result);
  //         };

  //         fileReader.onerror = (error) =>{
  //             reject(error);

  //         };
  //     });
  // }
  const handleChangeContentImage = (e) => {
		if (e.target.files[0]) {
			setContentImage(e.target.files[0]);
		}
        // console.log(URL.createObjectURL(image))
	};
  const post = async (urlImage) =>{
    if (content != '') {
      try {
          const response = await axios.post(
            `http://localhost:3004/posts`,
            {
              content: content,
              contentImage: urlImage,
              userId: currentUser.id,
              user: currentUser
            }
        );
        if (response.status === 200) {
            alert('Post successfully');
            // quay ve man hinh chinh
            navigate('/');
        }
      } catch (error) {
        console.log(error)
      }
  }else{
      alert('Write something!!')
  }
  }

  const newPost = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${contentImage.name}`); // tạo địa chỉ chứa ảnh
    const uploadTask = uploadBytesResumable(storageRef, contentImage, metadata); // hàm upload ảnh
    uploadTask.on(
      'state_changed',
      (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
              case 'paused':
                  console.log('Upload is paused');
                  break;
              case 'running':
                  console.log('Upload is running');
                  break;
          }
      },
      (error) => {
          console.log(error) // Xử lý trường hợp tải ảnh thất bại
      },
      () => {
          // Xử lý trường hợp tải ảnh thành công
          //  Lấy về đường link của ảnh vừa tải thành công
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              alert(
                  'Upload image successfully'
              );
              post(downloadURL)
              // reset các trạng thái sau khi tải ảnh thành công
              setContentImage(null);
              setProgress(0);
              console.log('File available at', downloadURL);
              window.location.reload();
          });
        }
    );
  };
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
          <LeftBar />
        </div>
        <div class="flex-1 p-4 ">
          {
            currentUser?.username ? (
              <div className="flex flex-col bg-white w-11/12 mx-auto min-h-[168px] rounded-[16px] mb-6">
                <div className="flex">
                  <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                    <img className="rounded-[18px] w-[44px] h-[44px]" src={currentUser.image}></img>
                  </div>
                  <div className="flex flex-col w-full">
                    <textarea name="postContent" onChange={(e)=>{setContent(e.target.value)}} className="min-h-[103px] w-11/12 px-4 py-4"/>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-row w-full bg-light-blue-rgba h-[70px] gap-4 rounded-bl-2xl">
                    <img src={photo} className="mt-[22px] ml-[35px] w-[21px] h-[24px]"></img>
                    <input type="file" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChangeContentImage} ></input>
                    <p className="text-[16px] mt-[22px]">Photo</p>
                  </div>
                  <div className="flex justify-center items-center bg-morelight-blue-rgba w-[77px] h-[70px] rounded-br-2xl">
                      <img className="w-[24px] h-[24px] cursor-pointer" onClick={newPost} src={send}></img>
                  </div>
                </div>
              </div>
            ) : (
              <div>s</div>
            )
          }
          {
             currentUserPost.map((item, index)=>(
              <div key={index} className=" flex flex-col bg-white w-11/12 mx-auto min-h-[168px]  rounded-[16px] mb-6">
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
                <div className="h-80 w-12/12 rounded-[18px] mx-4 mb-4">
                  <img className="w-full max-h-80" src={item.contentImage}></img>
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
            )) 
          }
          
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default Home;
