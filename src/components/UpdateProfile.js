import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import settings from "../svg/settings.svg";
import { useNavigate, useParams } from "react-router-dom";
import {storage} from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




export default function UpdateProfile() {
    const [currentUser, setCurrentUser] = useState(null);
    const id = useParams();
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [reNewPass, setReNewPass] = useState('');
    const [birthday, setBirthday] = useState('09-27-2023');
    const metadata = {contentType: 'image/jpeg',};
    const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
    const navigate = useNavigate();

    
    const getDataUser = async () =>{
        const response = await axios.get('http://localhost:3004/user/' + id.id)
        setCurrentUser(response.data);
        setFullName(response.data.username)
        setImage(response.data.image)
        setEmail(response.data.email)
    }
    // console.log('---  ' + fullName + '  ----  ' + password + '  ----  ' + image + '  ----  ' + email + '  ----  ');
    const handleChangeContentImage = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
        // console.log(URL.createObjectURL(image))
	};
    const checkBirthday = (birthday) =>{
        const input = birthday;
        const pattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d\d$/;
    
        if (pattern.test(input)) {
        setBirthday(input);
        return true;
        } else {
        return false;
        }
    }
    const update = async (updateImageUrl) =>{
        const dataUpdate = {
            fullname: fullName,
            email: email,
            image: updateImageUrl,
            birthday: birthday,
        }
        if (fullName !== '' && image !== null && email !== '' && birthday !== '') {
            if (checkBirthday(birthday)) {
                if (window.confirm('Want change information?')) {
                    const response = await axios.patch(
                        'http://localhost:3004/user/' + currentUser.id, dataUpdate);
                    if (response.status === 200 || response.status === 201) {
                        // alert('Update successfully');
                    }
                }
            }else{
                window.alert('Please enter a valid date in the format mm-dd-yyyy.')
                window.location.reload();
            }
        }else{
            window.alert('Please do not leave inputs blank !!')
        }
    }
    const handleUpdate = () =>{
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
                    if (image === currentUser.image) {
                        update(image);
                    }else {
                        update(downloadURL);
                    }
                    // reset các trạng thái sau khi tải ảnh thành công
                    setImage(null);
                    setProgress(0);
                    console.log('File available at', downloadURL);
                    // quay ve man hinh chinh
                    navigate('/');
                });
            }
        );
    }
    const handleChangePass = async () => {
        if (oldPass === currentUser.password) {
            if (newPass === reNewPass) {
                const response = await axios.patch('http://localhost:3004/user/' + currentUser.id,{
                    password: newPass,
                })
                if (response.status === 200) {
                    window.alert('Change password success!!')
                    navigate('/profile')
                }
            }else{
                window.alert('New password different with re-new password')
            }
        }else{
            window.alert('Wrong password!!')
        }
    }
    useEffect(()=>{
        getDataUser();
    },[id])
  return (
    <div>
        <Header />
        {
          currentUser?.username ? (
            <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto shadow-2xl shadow-blue-200'>
              <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                  
                    {
                      currentUser && (
                        <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>{currentUser.username}</p>
                      )
                    }
                  
              </div>
              <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'>
              </div>
              <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
                {
                  currentUser && (
                    <img className='rounded-[180px] w-44 h-44' src={currentUser.image}></img>
                  )
                }
                  
              </div>
            </div>
          ) : (
            <div className="">
            </div>
          )
        }
        <div className="w-6/12 my-8 mx-auto">
            <div className="flex flex-col bg-white w-11/12 mx-auto min-h-[200px] rounded-lg mb-6 shadow-xl shadow-blue-200">
                <div className="p-4">
                    <h1 className="flex items-center justify-center text-[30px] font-medium">Change Information</h1>
                    <label className="text-lg font-semibold">Full Name</label>
                    <input
                        type="text"
                        defaultValue={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">Email</label>
                    <input
                        type="text"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">Birth Day</label>
                    <input
                        type="text"
                        defaultValue={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="mm-dd-yyyy"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">Image</label>
                    <input
                        defaultValue={image}
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 mt-2 rounded  focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button className='h-9 w-1/12 text-white bg-[#0C4195] rounded-[9px] mb-4 ml-6' onClick={()=>handleUpdate()} disabled={!fullName || !email || !image || !birthday}>Update</button>
            </div>
        </div>
        <div className="w-6/12 my-4 mx-auto">
            <div className="flex flex-col bg-white w-11/12 mx-auto min-h-[200px] rounded-lg mb-6 shadow-xl shadow-blue-200">
                <div className="p-4">
                    <h1 className="flex items-center justify-center text-[30px] font-medium">Change Password</h1>
                    <label className="text-lg font-semibold">Old password</label>
                    <input
                        type="password"
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="Old password"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">New password</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="New password"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">Re-New password</label>
                    <input
                        type="password"
                        onChange={(e) => setReNewPass(e.target.value)}
                        placeholder="Re-New password"
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button className='flex h-9 w-fit p-4 justify-center items-center text-white bg-[#0C4195] rounded-[9px] mb-4 ml-6' onClick={()=>handleChangePass()} disabled={!oldPass || !newPass || !reNewPass}>Change Password</button>
            </div>
        </div>
    </div>
  )
}
