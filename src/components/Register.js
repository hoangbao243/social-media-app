import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {storage} from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


export default function Register() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [rePass, setRePass] = useState('');


    const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
    const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store

    const metadata = {
        contentType: 'image/jpeg',
    };
    
    const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
        // console.log(URL.createObjectURL(image))
	};

    const handleUpload = () =>{
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
                    alert(
                        'Upload image successfully, download URL: ' +
                            downloadURL
                    );
                    setNewUser(downloadURL)
                    // reset các trạng thái sau khi tải ảnh thành công
                    setImage(null);
                    setProgress(0);
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    const setNewUser = async (downloadURL) => {
        // e.preventDefault();
		if (pass === rePass) {
            const response = await axios.post(
                'http://localhost:3004/user',
                {
                    username: username,
                    password: pass,
                    email:  email,
                    image: downloadURL
                }
            );
            if (response.status === 201) {
                alert('Register successfully');
                // quay ve man hinh chinh
                navigate('/login');
            }
        }else{
            alert('Your re-password different w your pass!!')
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
                <h1 className='font-normal text-[36px] w-64 h-11 mx-auto mt-[30px] mb-[100px]'>Create Account</h1>
                <div class="relative ml-56">
                    <input type="text" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setUserName(e.target.value)} placeholder='Username'></input>
                    <input type="text" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setEmail(e.target.value)} placeholder='Email Address'></input>
                    <input type="password" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setPass(e.target.value)} placeholder='Password'></input>
                    <input type="password" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={(e)=> setRePass(e.target.value)} placeholder='Re-password'></input>



                    <input type="file" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" onChange={handleChange} ></input>
                    {
                        image && (
                            <div>
                                <img src={URL.createObjectURL(image)} style={{ maxWidth: '100%', maxHeight: '200px' }} className='w-40'>

                                </img>
                            </div>
                        )
                    }
                    {/* <button type='button' onClick={onUpload}>+</button> */}
                    <button className='h-[70px] w-6/12 text-white bg-[#0C4195] rounded-[9px] mx-16 mt-8' onClick={handleUpload} disabled={!username}>Register</button>
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
