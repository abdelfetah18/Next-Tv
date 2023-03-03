import Header from "@/components/Header";
import Banner from "@/components/Banner";
import WatchLatest from "@/components/WatchLatest";
import VideoPlayer from "@/components/VideoPlayer";

import { array } from "@/tests/videos";
import { useEffect, useState } from "react";
import { c_movie } from "@/types/client";
import axios from "axios";

export default function Movie(){
    // TODO: do some transition animation when the value in this state is changed. example: FadeOut, FadeIn...
    const [ready_to_watch,setReadyToWatch] = useState(false);
    const [movie,setMovie] = useState({} as c_movie);

    useEffect(() => {
        getMovie();
    },[]);

    function getMovie(){
        let path_trace = window.location.pathname.split("/");
        let movie_id = path_trace[path_trace.length-1];
        axios.get("/api/movies/"+movie_id).then(response => {
            if(response.data.status == "success"){
                setMovie(response.data.data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return(
        <div className="w-full background_image bg-black">
            <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                {
                    ready_to_watch ? (<VideoPlayer video={movie} has_playlist={false} />) : (<Banner video={movie} setToReady={setReadyToWatch} />)
                }
                <WatchLatest title="Latest Movies" latest={array} recently={array.slice(0,3)} />
            </div>
        </div>
    )
}