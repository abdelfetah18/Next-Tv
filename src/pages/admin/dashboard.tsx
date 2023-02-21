import Card from "@/components/admin/Card";
import Navigation from "@/components/admin/Navigation";
import { FaArrowDown, FaHome, FaPlay, FaPlus, FaUser } from "react-icons/fa";

export default function Dashboard(){
    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation path={"dashboard"} />
            </div>
            <div className="w-4/5 flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Dashboard</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 rounded-lg py-4 flex flex-col items-center">
                        <div className="w-11/12 flex flex-col items-center">
                            <Card />
                        </div>
                    </div>
                    <div className="w-1/3 bg-gray-800 rounded-lg mx-2 py-4 flex flex-col items-center">
                        <div className="w-11/12 py-4 flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="py-4 px-2 rounded bg-emerald-300"></div>
                                <div className="text-lg text-white font-bold ml-2">Popular videos</div>
                            </div>
                        </div>
                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full flex flex-row items-center justify-between">
                                <div className="text-xs font-bold text-gray-400">Videos</div>
                                <div className="text-xs font-bold text-gray-400">Views</div>
                            </div>
                            <div className="h-px w-full bg-gray-400/20 my-4"></div>
                        </div>
                        <div className="w-11/12 flex flex-col items-center">
                            {
                                [0,1,2,3].map((item,index) => {
                                    return(
                                        <div className="w-11/12 flex flex-row items-center mb-2 cursor-pointer rounded-lg hover:bg-gray-900/30">
                                            <div className="w-16 h-16 rounded-lg bg-gray-900"></div>
                                            <div className="h-full flex-grow flex flex-row items-center ">
                                                <div className="h-full flex-grow px-4 py-2 text-lg font-bold text-white">Title</div>
                                                <div className="px-4 py-2 text-xs font-semibold text-gray-200">1556</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}