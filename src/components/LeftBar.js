import React from 'react'
import friend from "../svg/friend.svg"
import chat from "../svg/chat.svg"

export default function LeftBar() {
  return (
    <div className="flex flex-col mt-4 w-[278px] min-h-[500px] ml-36 bg-bg-grey rounded-[18px]">
        <h1 className="text-[25px] mt-4 mx-auto">Category</h1>
        <div className="flex flex-row gap-4 rounded-[16px] h-[53px] px-4 py-4 mx-auto my-2 w-11/12 border border-gray">
            <img src={friend}></img>
            <p>Friend</p>
        </div>
        <div className="flex flex-row gap-4 rounded-[16px] h-[53px] px-4 py-4 mx-auto my-2 w-11/12 border border-gray">
            <img src={chat}></img>
            <p>Message</p>
        </div>
        <div className="flex flex-row gap-4 rounded-[16px] h-[53px] px-4 py-4 mx-auto my-2 w-11/12 border border-gray">
            <img src={chat}></img>
            <p>Message</p>
        </div>
        <div className="flex flex-row gap-4 rounded-[16px] h-[53px] px-4 py-4 mx-auto my-2 w-11/12 border border-gray">
            <img src={chat}></img>
            <p>Message</p>
        </div>
    </div>
  )
}
