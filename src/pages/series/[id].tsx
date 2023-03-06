import Banner from "@/components/Banner";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import WatchLatest from "@/components/WatchLatest";
import { array } from "@/tests/videos";
import { c_latest, c_serie } from "@/types/client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Serie(){
    // FIXME: remove these inits
    const init_serie: c_latest = { 
        _id:"",
        _type:"",
        categories:[],
        cover_image:{
            _id:"",
            originalFilename:"",
            url:""
        },
        date:"",
        description:"",
        duration:"",
        episodes:[],
        servers:[],
        title:"",
        total_episodes: 0
    };

    // TODO: do some transition animation when the value in this state is changed. example: FadeOut, FadeIn...
    const [ready_to_watch,setReadyToWatch] = useState(false);
    const [serie, setSerie] = useState(init_serie);
    const [series,setSeries] = useState([]);


    useEffect(() => {
        getSerie();
        getLatestSeries();
    },[]);

    function getSerie(){
        let path_trace = window.location.pathname.split("/");
        let movie_id = path_trace[path_trace.length-1];
        axios.get("/api/series/"+movie_id).then(response => {
            if(response.data.status == "success"){
                setSerie(response.data.data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    function getLatestSeries(){
        axios.get("/api/series").then(response => {
            if(response.data.status == "success"){
                setSeries(response.data.data);
            }else{
                // FIXME: implement a error handing method. (like showing a error message or something)
            }
        }).catch(err => console.log(err));
    }
    return(
        <div className="w-full background_image bg-black">
            <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                {
                    ready_to_watch ? (<VideoPlayer video={array[0]} has_playlist={true} />) : (<Banner video={serie} setToReady={setReadyToWatch} />)
                }
                <WatchLatest title="Latest Series" latest={series} recently={array.slice(0,3)} />
            </div>
        </div>
    )
}