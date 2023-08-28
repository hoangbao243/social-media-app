import React from 'react'

export default function RightBar() {
  return (
    <div class="w-1/4 p-4">
        <div className="flex flex-col mt-4 w-[278px] min-h-[500px] ml-6 bg-bg-grey rounded-[18px]">
        <h1 className="text-[25px] mt-4 mx-auto text-[18px] font-medium">People you may know: </h1>
        <div>
            <div className="flex flex-row h-[53px] rounded-[16px] w-11/12 border border-gray-300 mx-auto my-2">
            <div className="rounded-[18px] w-[44px] h-[44px] ml-4 my-auto">
                <img src="./images/avatar.png"></img>
            </div>
            <p className="font-medium text-[16px] my-auto mx-2">hoang bao</p>
            <div className="flex justify-center text-text-blue border-solid border border-blue-300 bg-blue-100 w-16 h-8 rounded-[8px] my-auto ml-6">connect</div>
            </div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </div>
        </div>
    </div>
  )
}
