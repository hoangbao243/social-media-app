import React, { useState, useEffect } from "react";
import like from "../svg/like.svg"
import comment from "../svg/comment.svg"
import plus from "../svg/plus.svg"
import { useParams } from "react-router-dom";
import axios from "axios";

function Pdemo() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const getData = async () => {
        const setData = await axios.get('https://vtcsyp-5555.csb.app/user')
        if (setData.status === 200) {
            const FriendId = setData.data.find(item => item.id == id)
            setUser(FriendId);
        }
    }
    const [post, setPost] = useState();
    const getPostData = async () => {
        const postData = await axios.get('https://vtcsyp-5555.csb.app/posts')
        if (postData.status === 200) {
            const friendPost = postData.data.filter(item => item.userId == id)
            setPost(friendPost);
            console.log(friendPost)
        }
        console.log(postData);
    }
    useEffect(() => {
        getData()
        getPostData()
    }, [id])

    return (
        <>
            {
                post && post?.map((item, index) => (
                    <div key={index} className="w-1/2 my-8 h-b200px] mx-auto">
                        <div className="flex flex-col bg-white w-11/12 mx-auto min-h-[168px]  rounded-[16px] mb-6 shadow-2xl shadow-blue-200">
                            <div className="flex flex-row gap-4">
                                <div className="rounded-[18px] w-[44px] h-[44px] bg-gray-200 ml-6 mt-4">
                                    <img className="rounded-[18px] w-[44px] h-[44px]" src={user && user.image}></img>
                                </div>
                                <div className="mt-6 mx-4 font-bold text-[17px]">{user && user.username}</div>
                            </div>
                            <div className="ml-6 mt-4 mb-4 min-h-[28px] w-10/12">{item && item.content}</div>
                            {   item.contentImage && (
                                <div className="mx-4 mb-4 min-h-[15rem] w-12/12 rounded-[18px]">
                                    <img className="w-full max-h-[40rem] rounded-xl" src={item.contentImage}></img>
                                </div>
                            )}
                            <div className="flex flex-row gap-4 ml-5">
                                <img className="w-8 h-8" src={like}></img>
                                <img className="w-8 h-8" src={comment}></img>
                            </div>
                            <div className="flex flex-row bg-grey-rgba min-h-[62px] w-12/12 mb-4 mx-4 rounded-[18px] px-2 py-2">
                                <textarea name="textpost" className="min-h-[42px] w-11/12 px-4 py-4 rounded-[18px] bg-grey-rgba"></textarea>
                                <img className="ml-6 cursor-pointer" src={plus}></img>
                            </div>
                        </div>
                    </div>
                ))

            }
        </>
    )
}
export default Pdemo;