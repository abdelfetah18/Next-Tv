import Header from "@/components/Header";
import WatchLatest from "@/components/WatchLatest";
import { array } from "@/tests/videos";

export default function Movies(){
    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <Header />
                <div className="w-11/12 flex-grow flex flex-row items-center">
                    <WatchLatest title="Latest Movies" latest={array} recently={array.slice(0,3)} />
                </div>
            </div>
        </div>
    )
}