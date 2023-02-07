import { FaAngleLeft, FaBookmark } from "react-icons/fa"

export default function WatchLatest(){
    return (
        <div className="w-11/12 h-fit max-w-[1600px] flex flex-row">
            <div className="w-3/4 h-[600px] flex flex-col items-center">
                <div className="w-11/12 text-lg text-white font-bold">Watch Latest</div>
                <div className="w-11/12 h-px bg-gray-100"></div>
                <div className="my-4 h-full overflow-auto w-11/12 flex flex-row items-center flex-wrap">
                    {
                        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((m,index) => {
                            return(
                                <div key={index} className="w-1/5 h-72 mb-16">
                                    <div className="w-11/12 h-full bg-gray-500 rounded-lg relative">
                                        <div className="absolute top-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaBookmark className="text-xs text-white" />
                                        </div>
                                        <div className="absolute top-0 right-0 m-2 cursor-pointer bg-blue-900/50 rounded-full border-green-500 border-2">
                                            <div className="text-xs text-white py-2 px-1 font-semibold">10.0</div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaAngleLeft className="text-xs text-white" />
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-white mt-2">Title</div>
                                    <div className="text-sm font-semibold text-[#bababa]">category</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-1/4 flex flex-col items-center">
                <div className="w-11/12 text-lg text-white font-bold">Recently Added</div>
                <div className="w-11/12 h-px bg-gray-100"></div>
                <div className="w-11/12 flex flex-row items-center my-4">
                {
                    [0,1,2].map((m,index) => {
                        return(
                            <div key={index} className="w-1/3 h-40 mb-16">
                                <div className="w-11/12 h-full bg-gray-500 rounded-lg"></div>
                                <div className="text-base font-bold text-white mt-2">Title</div>
                                <div className="text-xs font-semibold text-[#bababa]">category</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}