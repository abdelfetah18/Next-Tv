import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import WatchLatest from "../components/WatchLatest";

export default function Home() {
  return (
    <div className="w-full background_image bg-black">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">

        <Header />
        <SearchBanner />
        <WatchLatest />
      </div>
    </div>
  )
}