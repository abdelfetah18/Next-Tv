import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import WatchLatest from "../components/WatchLatest";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(){
  const [is_search,setIsSearch] = useState(false);
  const [watch_latest,setWatchLatest] = useState([]);
  const [recently,setRecently] = useState([]);

  useEffect(() => {
    if(!is_search){
      getWatchLatest();
      getRecently();
    }
  },[is_search]);

  function getWatchLatest(){
    axios.get("/api/watch_latest").then(response => {
      console.log(response.data);
      if(response.data.status == "success"){
        setWatchLatest(response.data.data);
      }
    }).catch(err => {
      console.log({ err });
    });
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

  return (
    <div className="w-full background_image bg-black">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
        <Header />
        <SearchBanner setIsSearch={setIsSearch} setResult={setWatchLatest} />
        <WatchLatest title={is_search ? "Searching..." : "Watch Latest"} latest={watch_latest} recently={recently} />
      </div>
    </div>
  )
}