import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import WatchLatest from "../components/WatchLatest";

import { array } from "@/tests/videos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(){
  const [watch_latest,setWatchLatest] = useState([]);

  useEffect(() => {
    axios.get("/api/watch_latest").then(response => {
      console.log(response.data);
      if(response.data.status == "success"){
        setWatchLatest(response.data.data);
      }
    }).catch(err => {
      console.log({ err });
    });
  },[]);

  return (
    <div className="w-full background_image bg-black">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
        <Header />
        <SearchBanner />
        <WatchLatest title="Watch Latest" latest={watch_latest} recently={array.slice(0,3)} />
      </div>
    </div>
  )
}