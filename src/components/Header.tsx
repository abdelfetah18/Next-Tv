import { FaTv, FaFilm, FaPlus, FaFolder, FaAngleDown, FaUser } from "react-icons/fa"

export default function Header(){
    return (
        <div className="w-11/12 h-fit max-w-[1600px] flex flex-row items-center justify-between py-4">
            <div className="flex flex-row items-center">
                <a href="/series" className="flex flex-row items-center cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <FaTv />
                    <div className="ml-2">Series</div>
                </a>
                <a href="/movies" className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <FaFilm />
                    <div className="ml-2">Movies</div>
                </a>
                <div className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <FaPlus />
                    <div className="ml-2">Recently Added</div>
                </div>
                <div className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <FaFolder />
                    <div className="ml-2">Categories</div>
                    <FaAngleDown />
                </div>
            </div>
            <div className="flex flex-row items-center">
                <a href="/user/sign_in" className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <FaUser />
                    <div className="ml-2">Login</div>
                </a>
                <a href="/user/sign_up" className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                    <div className="ml-2 px-4 py-2 rounded-3xl border-2 border-white hover:border-purple-500">Register</div>
                </a>
            </div>
        </div>
    )
}