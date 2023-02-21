import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import WatchLatest from "../components/WatchLatest";

import { array } from "@/tests/videos";

export default function Home(){
  return (
    <div className="w-full background_image bg-black">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
        <Header />
        <SearchBanner />
        <WatchLatest title="Watch Latest" latest={array} recently={array.slice(0,3)} />
      </div>
    </div>
  )
}