import { c_movie } from "@/types/client";
import { FaBookmark } from "react-icons/fa";

interface Props {
    setToReady: (state:boolean) => void,
    video: c_movie
};

export default function Banner({ setToReady, video }:Props){

    function watch(){
        setToReady(true);
    }

    return(
        <div className="w-11/12 h-fit flex flex-col items-center py-8">
           <div className="w-full h-96 rounded-lg relative">
                <div className="w-full h-full flex flex-col items-center bg-black/50 rounded-lg">
                    {
                        // TODO: Implement a banner style images for movies and series objects.
                        // <img className="h-full w-full object-fit rounded-lg" src={"/banner.jpg"} />
                    }
                </div>
                <div className="w-full absolute bottom-0 p-8 flex flex-row items-center">
                    <div className="ml-4 flex-grow flex flex-col">
                        <div className="text-3xl font-bold text-white">{video.title}</div>
                        <div className="flex flex-row items-center my-2">
                            <div className="text-xs font-bold px-2 rounded-3xl text-white border-2 border-white mr-2">Drama</div>
                            <div className="text-xs font-bold px-2 rounded-3xl text-white border-2 border-white mr-2">Action</div>
                        </div>
                        <div className="flex flex-row items-center mb-1">
                            <div className="self-start text-sm text-white font-semibold bg-gray-900/80 px-4 rounded-lg mr-2">Duration: {video.duration}</div>
                            <div className="self-start text-sm text-white font-semibold bg-gray-900/80 px-4 rounded-lg mr-2">5 Episodes</div>
                        </div>
                        <div className="self-start text-sm text-white font-semibold w-1/2 drop-shadow-2xl bg-black/40 rounded-lg p-2">{video.description}</div>
                        <div className="flex flex-row items-center my-2">
                            <div onClick={watch} className="text-base text-white font-bold bg-blue-900 rounded-lg px-4 py-2 mr-2 cursor-pointer">Watch</div>
                            <div className="text-base text-white font-bold bg-white/40 rounded-lg p-3 mr-2">
                                <FaBookmark />
                            </div>
                        </div>
                    </div>
                    <img className="h-full rounded-lg" src={video.cover_image ? video.cover_image.url : "/thumb.jpg"} />
                </div>
           </div>
        </div>
    )
}