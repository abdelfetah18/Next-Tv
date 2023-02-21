import Banner from "@/components/Banner";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import WatchLatest from "@/components/WatchLatest";
import { array } from "@/tests/videos";
import { useState } from "react";

export default function Serie(){
     // TODO: do some transition animation when the value in this state is changed. example: FadeOut, FadeIn...
     const [ready_to_watch,setReadyToWatch] = useState(false);

    return(
        <div className="w-full background_image bg-black">
            <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                {
                    ready_to_watch ? (<VideoPlayer video={array[0]} has_playlist={true} />) : (<Banner setToReady={setReadyToWatch} />)
                }
                <WatchLatest title="Latest Series" latest={array} recently={array.slice(0,3)} />
            </div>
        </div>
    )
}