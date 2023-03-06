import Header from "@/components/Header";
import WatchLatest from "@/components/WatchLatest";
import { array } from "@/tests/videos";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Movies(){
    const [movies,setMovies] = useState([]);
    const [recent_movies,setRecentMovies] = useState([]);
    
    useEffect(() => {
        getLatestMovies();
        // getRecentMovies(); // TODO: Not Implemented
    },[]);

    function getLatestMovies(){
        axios.get("/api/movies").then(response => {
            if(response.data.status == "success"){
                setMovies(response.data.data);
            }else{
                // FIXME: implement a error handing method. (like showing a error message or something)
            }
        }).catch(err => console.log(err));
    }

    function getRecentMovies(){
        axios.get("/api/movies/recent").then(response => {
            if(response.data.status == "success"){
                setRecentMovies(response.data.data);
            }else{
                // FIXME: implement a error handing method. (like showing a error message or something)
            }
        }).catch(err => console.log(err));
    }

    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                <div className="w-11/12 flex-grow flex flex-row items-center">
                    <WatchLatest title="Latest Movies" latest={movies} recently={recent_movies} />
                </div>
            </div>
        </div>
    )
}