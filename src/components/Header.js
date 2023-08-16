import React from "react";
import { Link } from "react-router-dom";
import homeSvg from "../svg/home.svg";
import friendSvg from "../svg/friend.svg";
import notificationSvg from "../svg/notification.svg";
import chatSvg from "../svg/chat.svg";
import profileSvg from "../svg/profile.svg";
import search from "../svg/search.svg";

export default function Header() {
  return (
    <div className="w-full flex flex-row h-[76px] justify-between bg-white px-[140px]">
      <div className=" my-[18px]">
        <Link to={'/'} className="flex flex-row gap-3">
          <img className="w-[108px] h-[40px]" src="./images/Social.png"></img>
          <div className="flex flex-col w-10 h-10 bg-[#5D5FEF] rounded-[8px] justify-center px-1 py-1 mt-[1px]">
            <img src="./images/net.png"></img>
          </div>
        </Link>
      </div>
      <div className="flex flex-row gap-[65px] mt-6 mb-6">
        <div>
          <img className="w-[28px] h-[28px]" src={homeSvg}></img>
        </div>
        <div>
          <img  className="w-[28px] h-[28px]" src={friendSvg}></img>
        </div>
        <div>
          <img  className="w-[28px] h-[28px]" src={notificationSvg}></img>
        </div>
        <div>
          <img  className="w-[28px] h-[28px]" src={chatSvg}></img>
        </div>
        <div>
          <img  className="w-[28px] h-[28px]" src={profileSvg}></img>
        </div>
      </div>
      <div className="flex flex-row" >
        <img className="my-4" src="./images/Line1.png"></img>
        <div>
            <form className="flex flex-1 ml-[15px] my-4">
              <input className="flex-1 w-[206px] h-[44px] rounded-l-2xl border-2 "></input>
              <button type="submit" className="flex-1 flex justify-center items-center rounded-r-2xl bg-blue-rgba w-[61px] h-[44px] ">
                <img src={search}></img>
              </button>
            </form>
        </div>
      </div>
    </div>
  )
}
