import { FaPlay, FaSearch } from "react-icons/fa";

export default function SearchBanner(){
    return(
        <div className="w-11/12 h-fit flex flex-col items-center py-20">
            <div className="flex flex-row items-center">
                <div className="text-3xl text-white font-bold">Next</div>
                <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                <div className="text-3xl text-white font-bold">Tv</div>
            </div>
            <div className="flex flex-row items-center bg-[#ffffff7f] rounded-3xl text-white px-4 my-4 font-bold">
            <input className="text-white w-96 px-4 py-2  bg-[#ffffff00] placeholder:text-white focus:outline-0" placeholder="Search..."/>
            <FaSearch className="cursor-pointer" />
            </div>
        </div>
    )
}