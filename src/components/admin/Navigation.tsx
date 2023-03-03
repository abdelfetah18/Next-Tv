import { useState } from "react";
import { FaFilm, FaHome, FaPlus, FaTv } from "react-icons/fa";

interface Props {
    path: string
};

export default function Navigation({ path }:Props){
    // TODO: imlement some transitions when the is_open state got toggled.
    const [is_open,setOpen] = useState(path.startsWith("create") ? true : false);

    function toggle(){
        setOpen(state => !state);
    }

    return(
        <div className="w-full flex flex-col items-center my-8">
            <a href="/admin/dashboard" className={"w-11/12 flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2 "+ (path == "dashboard" ? "bg-gray-800" : "")}>
                <div className="text-lg text-white font-bold mx-2"><FaHome /></div>
                <div className="text-lg text-white font-bold mx-2">Dashboard</div>
            </a>
            <div className="w-11/12 flex flex-col items-center">
                <div onClick={toggle} className="w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2">
                    <div className="text-lg text-white font-bold mx-2"><FaPlus /></div>
                    <div className="text-lg text-white font-bold mx-2">Add</div>
                </div>
                {
                    is_open ? (
                        <div className="w-11/12 flex flex-col items-center">
                            <a href="/admin/movie/create" className={"w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2 "+(path == "create_movie" ? "bg-gray-800" : "")}>
                                <div className="text-base text-white font-bold mx-2"><FaFilm /></div>
                                <div className="text-base text-white font-bold mx-2">Movie</div>
                            </a>
                            <a href="/admin/serie/create" className={"w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2 "+(path == "create_serie" ? "bg-gray-800" : "")}>
                                <div className="text-base text-white font-bold mx-2"><FaTv /></div>
                                <div className="text-base text-white font-bold mx-2">Serie</div>
                            </a>
                        </div>
                    ) : ("")
                }
            </div>
            <a href="/admin/movie" className={"w-11/12 flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2 "+ (path == "movie" ? "bg-gray-800" : "")}>
                <div className="text-lg text-white font-bold mx-2"><FaFilm /></div>
                <div className="text-lg text-white font-bold mx-2">Movies</div>
            </a>
            <a href="/admin/serie" className={"w-11/12 flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2 "+ (path == "serie" ? "bg-gray-800" : "")}>
                <div className="text-lg text-white font-bold mx-2"><FaTv /></div>
                <div className="text-lg text-white font-bold mx-2">Series</div>
            </a>
            
        </div>
    )
}