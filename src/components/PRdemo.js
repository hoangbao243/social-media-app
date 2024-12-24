import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function PRdemo() {
    const {id} = useParams();
    const [user, setUser] = useState();
    const getData = async() => {
        const setData = await axios.get('https://vtcsyp-5555.csb.app/user')
        if(setData.status === 200){
            const FriendId = setData.data.find(item => item.id == id)
            setUser(FriendId);
            
            
        }
        console.log(setData)

    }
    useEffect(()=>{
        getData()
    },[id])
    
    return (
        <>
            <div className="w-9/12 mx-auto my-10">
                <div className="flex w-full bg-sky h-[196px] rounded-t-[16px]">
                    <div className="text-[blue] mt-36 ml-64 font-bold text-[32px]">{user && user.username}</div>
                </div>
                <div className="relative w-full bg-slate-400 h-[112px] rounded-b-[16px]">
                    <div className="left-16 bottom-14 bg-orange-500 absolute h-44 w-44 rounded-[180px]">
                        <img className="rounded-[180px] w-44 h-44" src={user && user.image}></img>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PRdemo;