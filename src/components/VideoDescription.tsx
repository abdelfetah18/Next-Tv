import { c_episode, c_movie, c_serie } from "@/types/client";

interface Props {
    video: c_movie | c_serie
};

const VideoDescription:React.FC<Props> = ({ video }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="self-start text-xl text-white font-bold">{video.title}</div>
            <div className="w-full flex flex-row items-center my-2">
            {
                video.categories.map((category,index) => {
                    return(
                        <div key={index} className="self-start text-xs text-gray-500 font-semibold px-2 rounded-full bg-gray-800 mr-2">{category.name}</div>
                    )
                })
            }
            </div>
            <div className="self-start w-11/12 text-base text-gray-400 font-medium lowercase">{video.description}</div>
        </div>
    )
};

export default VideoDescription;