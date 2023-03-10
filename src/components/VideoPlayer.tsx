import { c_episode, c_movie, c_serie } from "@/types/client";
import { useState } from "react";
import Box from "./Box";
import VideoDescription from "./VideoDescription";

interface Props {
    video: c_movie,
    has_playlist: boolean
};

const VideoPlayer : React.FC<Props> = function ({ video, has_playlist }){
    const [seleted_server,setSelectedServer] = useState(video.servers[0] || null);

    return(
        <div className="w-11/12 h-fit flex flex-col items-center py-8">
            <div className="w-11/12 h-fit flex flex-row items-center py-8">
                <div className="w-4/5 h-[500px] flex flex-col">
                    {
                        seleted_server ? (
                            <iframe className="mr-4 h-full rounded-lg" src={seleted_server.url} />
                        ) : (
                            <div className="w-11/12 h-full flex flex-col items-center justify-center bg-gray-800/40 rounded-lg text-xl text-center text-white font-bold">No servers available yet.</div>
                        )
                    }
                </div>
                <div className="w-1/5 h-[500px] flex flex-col items-center pb-2">
                    <Box title="Servers List" items={video.servers} selected={seleted_server} setSelected={setSelectedServer} />
                </div>
            </div>
            <div className="w-11/12 flex flex-row">
                <div className={"flex flex-col items-center "+ (has_playlist ? "w-3/4": "w-5/6")}>
                    <VideoDescription video={video} />
                </div>
                {
                    has_playlist && (
                        <div className="w-1/4 flex flex-col items-center">
                            <Box title="Episodes" items={[{ name: "Episode 1" }]} selected={{ name: "Episode 1" }} setSelected={() => 0} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VideoPlayer;