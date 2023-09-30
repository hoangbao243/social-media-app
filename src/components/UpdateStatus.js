import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import settings from "../svg/settings.svg";
import { useNavigate, useParams } from "react-router-dom";
import {storage} from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Context } from '../context/myContext';





export default function UpdateStatus() {
    const [currentUser, setCurrentUser] = useState(null);
    const id = useParams();
    const [post,setPost] = useState(null)
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const metadata = {contentType: 'image/jpeg',};
    const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
    const navigate = useNavigate();
    const {user,setUser} = useContext(Context);

    

    
    const getDataUser = async () =>{
        const response = await axios.get('http://localhost:3004/user/')
        if (response.status === 200) {
            setCurrentUser(response.data.filter(item=>item.username === user.username));
        }
        const response1 = await axios.get('http://localhost:3004/posts/' + id.id)
        if (response1.status === 200) {
            setPost(response1.data);
            console.log(response1.data);
        }
    }
    const handleChangeContentImage = (e) => {
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
    
    const update = async (updateImageUrl) =>{
        const dataUpdate = {
            content: content,
            image: updateImageUrl,
        }
        const response = await axios.patch(
            'http://localhost:3004/posts/' + id.id, dataUpdate);
        if (response.status === 200 || response.status === 201) {
            // alert('Update successfully');
        }
    }
    console.log(content);
    const handleUpdate = async () =>{
        if (content !== '' && !image) {
            if (content !== post.content || image !== post.image) {
                if (!image) {
                    if (window.confirm('Yes: Bạn muốn để trống ảnh? / No: Bạn muốn dùng ảnh củ?')) {
                        const dataUpdate = {
                            content: content,
                            userId: post.userId,
                            user: post.user,
                            like: post.like,
                            comment: post.comment,
                            id: post.id,
                            numLike: post.numLike,
                        }
                        const response = await axios.put(
                            'http://localhost:3004/posts/' + id.id, dataUpdate);
                        if (response.status === 200 || response.status === 201) {
                            // alert('Update successfully');
                        }
                    }else{
                        const dataUpdate = {
                            content: content,
                            userId: post.userId,
                            user: post.user,
                            contentImage: post.image,
                            like: post.like,
                            comment: post.comment,
                            id: post.id,
                            numLike: post.numLike,
                        }
                        const response = await axios.put(
                            'http://localhost:3004/posts/' + id.id, dataUpdate);
                        if (response.status === 200 || response.status === 201) {
                            // alert('Update successfully');
                        }
                    }
                }else{
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
                                    update(downloadURL);
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
            }else{
                window.alert('Nhập dữ liệu muốn sửa')
            }
        }else{
            window.alert('Không được để trống')
        }
    }
    useEffect(()=>{
        
    },[id])
    useEffect(()=>{
        if (user && user.username) {
            getDataUser();
        }
    },[user])
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
                    <h1 className="flex items-center justify-center text-[30px] font-medium">Change Status</h1>
                    <label className="text-lg font-semibold">Content Status</label>
                    <input
                        type="text"
                        placeholder="content"
                        onChange={e=>setContent(e.target.value)}
                        className="w-full p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="p-4">
                    <label className="text-lg font-semibold">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 mt-2 rounded  focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button className='h-9 w-1/12 text-white bg-[#0C4195] rounded-[9px] mb-4 ml-6' onClick={()=>handleUpdate()} >Update</button>
            </div>
        </div>
    </div>
  )
}
