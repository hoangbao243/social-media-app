import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {storage} from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


export default function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [rePass, setRePass] = useState('');
    const currentTime = new Date().toLocaleString();
    const [error, setError] = useState(null)



    const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
    const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store

    const metadata = {
        contentType: 'image/jpeg',
    };
    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (allowedTypes.includes(selectedFile.type)) {
                if (e.target.files[0]) {
                    setImage(selectedFile);
                }
            } else {
              // The selected file is not an allowed type
              alert('Vui lòng chỉ chọn file có đuôi PNG hoặc JPG');
              setImage(null)
            }
          }
	};
    console.log(image);
    const handleUpload = () =>{
        const validate = ()=>{
            if (username.length >= 6 && username.length <21 && /^[a-zA-Z0-9]+$/.test(username)) {
                if (/^[a-zA-Z0-9]{6,20}$/.test(pass)) {
                    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                        if (pass === rePass) {
                            return true;
                        }else{
                            setError('Nhập lại mật khẩu sai!!')
                            return false;
                        }
                    }else{
                        setError('Email phải đúng định dạng!!')
                        return false;
                    }
                }else{
                    setError('Mật khẩu từ 6-20 kí tự và không chưa kí tự đặc biệt!!')
                    return false;
                }
            }else{
                setError('Tài khoản từ 6-20 kí tự và không chưa kí tự đặc biệt!!')
                return false;
            }
        }
        if (validate()) {
            const storageRef = ref(storage, `images/${image.name}`); // tạo địa chỉ chứa ảnh
            const uploadTask = uploadBytesResumable(storageRef, image, metadata); // hàm upload ảnh
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
                        setNewUser(downloadURL)
                        // reset các trạng thái sau khi tải ảnh thành công
                        setImage(null);
                        setProgress(0);
                        console.log('File available at', downloadURL);
                    });
                }
            );
        }
    }
    useEffect(()=>{
        if (error) {
            window.alert(error)
            setError(null)
        }
    },[error])
    const setNewUser = async (downloadURL) => {
            const response = await axios.post(
                'http://localhost:3004/user',
                {
                    username: username,
                    password: pass,
                    email:  email,
                    image: downloadURL,
                    role: "user",
                    createAt: currentTime,
                }
            );
            if (response.status === 201) {
                alert('Register successfully');
                // quay ve man hinh chinh
                navigate('/login');
            }
	};
  return (
    <div>
        <div className="w-full flex flex-row h-[76px] justify-center bg-white px-[140px]">
            <div className=" my-[18px]">
                <Link to={'/'} className="flex flex-row gap-3">
                <img className="w-[108px] h-[40px]" src="./images/Social.png"></img>
                <div className="flex flex-col w-10 h-10 bg-[#5D5FEF] rounded-[8px] justify-center px-1 py-1 mt-[1px]">
                    <img src="./images/net.png"></img>
                </div>
                </Link>
            </div>
        </div>
        <div className=' relative flex mx-36 bg-[#0C4195] h-[700px] w-10/12 mt-20 justify-end rounded-r-[22px]'>
            <h1 className='font-bold text-[32px] text-white mt-16 ml-12'>Good Vibes and good life. JoinToday.</h1>
            <img src='./images/Abstraction.png' className='absolute top-[200px] left-0'></img>
            <div className='w-8/12 h-[700px] bg-white rounded-[22px]'>
                <h1 className='font-normal text-[36px] w-64 h-11 mx-auto mt-4 mb-5'>Create Account</h1>
                <div class="relative ml-56">
                    <input type="text" pattern="[A-Za-z]{6,20}"  class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setUserName(e.target.value)} placeholder='Username'></input>
                    <input type="text" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setEmail(e.target.value)} placeholder='Email Address'></input>
                    <input type="password" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setPass(e.target.value)} placeholder='Password'></input>
                    <input type="password" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setRePass(e.target.value)} placeholder='Re-password'></input>



                    <input type="file" accept=".png, .jpg, .jpeg" class="w-8/12 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} ></input>
                    <div className='w-28 h-28 bg-gray-200'>
                        {
                            image && (
                                <div>
                                    <img src={URL.createObjectURL(image)} style={{ maxWidth: '100%', maxHeight: '200px' }} className='w-28 h-28'>

                                    </img>
                                </div>
                            )
                        }
                    </div>
                    
                    {/* <button type='button' onClick={onUpload}>+</button> */}
                    <button  onClick={()=>handleUpload()} className='h-[70px] w-6/12 text-white bg-[#0C4195] rounded-[9px] mx-16 mt-8' type='button' disabled={!username || !email || !pass || !rePass || !image}>Register</button>
                </div>
                {progress > 0 && (
					<progress value={progress} max="100" className="w-full" />
				)}
                <div className='mt-4 flex flex-row gap-2 ml-56'>
                    <p>Already  have an account?</p>
                    <Link className='text-[blue]' to={'/login'}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
