import { useState } from "react";
import { FaFilm, FaHome, FaPlus, FaTv } from "react-icons/fa";

export default function Navigation(){
    // TODO: imlement some transitions when the is_open state got toggled.
    const [is_open,setOpen] = useState(false);

    function toggle(){
        setOpen(state => !state);
    }

    return(
        <div className="w-full flex flex-col items-center my-8">
            <div className="w-11/12 flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2">
                <div className="text-lg text-white font-bold mx-2"><FaHome /></div>
                <div className="text-lg text-white font-bold mx-2">Dashboard</div>
            </div>
            <div className="w-11/12 flex flex-col items-center">
                <div onClick={toggle} className="w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2">
                    <div className="text-lg text-white font-bold mx-2"><FaPlus /></div>
                    <div className="text-lg text-white font-bold mx-2">Add</div>
                </div>
                {
                    is_open ? (
                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2">
                                <div className="text-base text-white font-bold mx-2"><FaFilm /></div>
                                <div className="text-base text-white font-bold mx-2">Movie</div>
                            </div>
                            <div className="w-full flex flex-row items-center hover:bg-gray-800 cursor-pointer rounded px-4 py-2">
                                <div className="text-base text-white font-bold mx-2"><FaTv /></div>
                                <div className="text-base text-white font-bold mx-2">Serie</div>
                            </div>
                        </div>
                    ) : ("")
                }
            </div>
            
        </div>
    )
}