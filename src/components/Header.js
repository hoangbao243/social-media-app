import React from "react";
import { Link, useHistory } from "react-router-dom";
import homeSvg from "../svg/home.svg";
import friendSvg from "../svg/friend.svg";
import notificationSvg from "../svg/notification.svg";
import chatSvg from "../svg/chat.svg";
import profileSvg from "../svg/profile.svg";
import search from "../svg/search.svg";
import { useState } from "react";

export default function Header({off}) {
  const [searchInput, setSearchInput] = useState(null);

  return (
    <div className="w-full flex flex-row h-[76px] justify-between bg-white px-[140px] shadow-2xl shadow-blue-200">
      <div className=" my-[18px]">
        <Link to={'/'} className="flex flex-row gap-3">
          <img className="w-[108px] h-[40px] lg:block sm:hidden " src="https://firebasestorage.googleapis.com/v0/b/social-media-23985.appspot.com/o/PublicImage%2FSocial.png?alt=media&token=ee97773a-daef-4550-aa50-c24c61a4f6c0"></img>
          <div className="flex flex-col w-10 h-10 bg-[#5D5FEF] rounded-[8px] justify-center px-1 py-1 mt-[1px] lg:block sm:hidden">
            <img src="https://firebasestorage.googleapis.com/v0/b/social-media-23985.appspot.com/o/PublicImage%2Fnet.png?alt=media&token=4c3bb831-5ce6-41dc-99ec-a79a0b623981"></img>
          </div>
        </Link>
      </div>
      <div className="flex flex-row gap-[65px] w-fit mt-6 mb-6">
        <div>
          <Link to={'/'}>
            <img className="lg:w-[28px] lg:h-[28px] sm:w-9 sm:h-9 max-w-none" src={homeSvg}></img>
          </Link>
        </div>
        <div>
          <Link to={'/friends'}>
            <img  className="lg:w-[28px] lg:h-[28px] sm:w-9 sm:h-9 max-w-none" src={friendSvg}></img>
          </Link>
        </div>
        <div>
          <Link to={'/chat'}>
            <img  className="lg:w-[28px] lg:h-[28px] sm:w-9 sm:h-9 max-w-none" src={chatSvg}></img>
          </Link>
        </div>
        <div>
          <Link to={'/profile'}>
            <img  className="lg:w-[28px] lg:h-[28px] sm:w-9 sm:h-9 max-w-none" src={profileSvg}></img>
          </Link>
        </div>
        <div>
          <Link to={'/demo/5'}>
            <img  className="lg:w-[28px] lg:h-[28px] sm:w-9 sm:h-9 max-w-none" src={profileSvg}></img>
          </Link>
        </div>
      </div>
      <div className="flex flex-row" >
        {
          off === 1 ? (
            <div></div>
          ) : (
            <div className="flex flex-row">
              <img className="my-4" src="https://firebasestorage.googleapis.com/v0/b/social-media-23985.appspot.com/o/PublicImage%2FLine1.png?alt=media&token=270600e0-fbd3-4e96-8cfa-44d542cf09c8"></img>
              <div>
                  <div className="flex ml-[15px] my-4">
                    <input onChange={e=>setSearchInput(e.target.value)} className=" w-3/12 h-[44px] rounded-l-2xl border-2 "></input>
                    <Link to={'search/' + searchInput}>
                      <button type="button" className=" flex justify-center items-center rounded-r-2xl bg-blue-rgba w-fit h-[44px] px-2 py-2" disabled={!searchInput}>
                        {/* <img src={search}></img> */}Search
                      </button>
                    </Link>
                  </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
