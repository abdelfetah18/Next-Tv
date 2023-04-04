import Header from "@/components/Header";
import WatchLatest from "@/components/WatchLatest";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Movies(){
    const [movies,setMovies] = useState([]);
    const [recently,setRecently] = useState([]);
    
    useEffect(() => {
        getLatestMovies();
        getRecently();
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
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                <div className="w-11/12 flex-grow flex flex-row items-center">
                    <WatchLatest title="Latest Movies" latest={movies} recently={recently} />
                </div>
            </div>
        </div>
    )
}