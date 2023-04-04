import useAuth from "@/hooks/Auth"
import { FaTv, FaFilm, FaFolder, FaAngleDown, FaUser, FaPlay } from "react-icons/fa"

export default function Header(){
    const isAuth = useAuth();

    return (
        <div className="w-11/12 h-fit max-w-[1600px] flex flex-row items-center justify-between py-4">
            <a href="/" className="flex flex-row items-center">
                <div className="text-3xl text-white font-bold">Next</div>
                <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                <div className="text-3xl text-white font-bold">Tv</div>
            </a>

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
                    <FaFolder />
                    <div className="ml-2">Categories</div>
                    <FaAngleDown />
                </div>
            </div>

            {
                isAuth ? (
                    <div className="flex flex-row items-center">
                        <FaUser className="text-white text-lg" />
                        <div className="ml-2 text-white text-sm font-bold">@abdelfetah</div>
                    </div>
                ) : (
                    <div className="flex flex-row items-center">
                        <a href="/user/sign_in" className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                            <FaUser />
                            <div className="ml-2">Login</div>
                        </a>
                        <a href="/user/sign_up" className="flex flex-row items-center ml-8 cursor-pointer hover:text-purple-500 duration-500 text-white text-base font-bold">
                            <div className="ml-2 px-4 py-2 rounded-3xl border-2 border-white hover:border-purple-500">Register</div>
                        </a>
                    </div>
                )
            }
        </div>
    )
}