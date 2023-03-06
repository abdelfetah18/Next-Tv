import Header from "@/components/Header";
import WatchLatest from "@/components/WatchLatest";
import { array } from "@/tests/videos";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Series(){
    const [series,setSeries] = useState([]);
    const [recent_series,setRecentSeries] = useState([]);
    
    useEffect(() => {
        getLatestSeries();
        // getRecentSeries(); // TODO: Not Implemented
    },[]);

    function getLatestSeries(){
        axios.get("/api/series").then(response => {
            if(response.data.status == "success"){
                setSeries(response.data.data);
            }else{
                // FIXME: implement a error handing method. (like showing a error message or something)
            }
        }).catch(err => console.log(err));
    }

    function getRecentSeries(){
        axios.get("/api/series/recent").then(response => {
            if(response.data.status == "success"){
                setRecentSeries(response.data.data);
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
                    <WatchLatest title="Latest Series" latest={series} recently={recent_series} />
                </div>
            </div>
        </div>
    )
}