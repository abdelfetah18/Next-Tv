import Header from "@/components/Header";
import Banner from "@/components/Banner";
import WatchLatest from "@/components/WatchLatest";
import VideoPlayer from "@/components/VideoPlayer";
import { useEffect, useState } from "react";
import { c_latest } from "@/types/client";
import axios from "axios";

export default function Movie(){
    // FIXME: remove these inits
    const init_movie: c_latest = { 
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
    const [movie,setMovie] = useState(init_movie);
    const [movies,setMovies] = useState([]);
    const [recently,setRecently] = useState([]);

    useEffect(() => {
        getMovie();
        getLatestMovies();
        getRecently();
    },[]);

    function getMovie(){
        let path_trace = window.location.pathname.split("/");
        let movie_id = path_trace[path_trace.length-1];
        axios.get("/api/movies/"+movie_id).then(response => {
            if(response.data.status == "success" && response.data.data){
                setMovie(response.data.data);
            }else{
                // FIXME: handle the error.
            }
        }).catch(err => {
            console.log(err);
        });
    }

    function getLatestMovies(){
        axios.get("/api/movies").then(response => {
            if(response.data.status == "success"){
                setMovies(response.data.data);
            }else{
                // FIXME: implement a error handing method. (like showing a error message or something)
            }
        }).catch(err => console.log(err));
    }

    function getRecently(){
        axios.get("/api/recently").then(response => {
          console.log(response.data);
          if(response.data.status == "success"){
            setRecently(response.data.data);
          }
        }).catch(err => {
          console.log({ err });
        });
    }

    return(
        <div className="w-full background_image bg-black">
            <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                {
                    ready_to_watch ? (<VideoPlayer video={movie} has_playlist={false} />) : (<Banner video={movie} setToReady={setReadyToWatch} />)
                }
                <WatchLatest title="Latest Movies" latest={movies} recently={recently} />
            </div>
        </div>
    )
}