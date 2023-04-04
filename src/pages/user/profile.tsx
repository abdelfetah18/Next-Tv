import Header from "@/components/Header";
import { FaAngleLeft, FaCamera } from "react-icons/fa";

export default function Profile(){
    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <div className="w-11/12 flex flex-row flex-grow">
                    <div className="w-1/4 h-full flex flex-col items-center rounded bg-gray-800/20">
                        <a href="/" className="w-11/12 py-4 text-white font-bold text-lg flex flex-row items-center cursor-pointer"><FaAngleLeft />Home</a>
                        <div className="w-11/12 flex flex-col items-center my-40">
                            <div className="w-full text-center text-base text-white font-semibold font-mono px-4 py-2 bg-gray-800/40 rounded cursor-pointer">Edit user information</div>
                            <div className="w-full text-center text-base text-white font-semibold font-mono px-4 py-2 hover:bg-gray-800/40 rounded cursor-pointer">Login Sessions</div>
                            <div className="w-full text-center text-base text-white font-semibold font-mono px-4 py-2 hover:bg-gray-800/40 rounded cursor-pointer">Log out</div>
                        </div> 
                    </div>
                    <div className="flex-grow ml-8 h-full flex flex-col items-center rounded bg-gray-800/20">
                        <div className="w-11/12 flex flex-col items-center my-16">
                            <div className="relative">
                                <img className="w-40 h-40 rounded-full object-cover" src="/thumb.jpg" alt="profile picture" />
                                <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500"><FaCamera className="text-white"/></div>
                            </div>
                            <div className="w-full flex flex-col items-center py-8">
                                <input className="w-1/2 px-4 py-2 text-white rounded outline-none bg-gray-800/80 my-2" placeholder="Username" type="text" />
                                <input className="w-1/2 px-4 py-2 text-white rounded outline-none bg-gray-800/80 my-2" placeholder="Email" type="text" />
                            </div>
                            <div className="my-2 px-8 py-1 cursor-pointer rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm">Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}