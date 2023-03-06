import { Key } from "react"
import { FaAngleLeft, FaBookmark } from "react-icons/fa"

import { c_latest, c_movie, c_serie } from "@/types/client";

interface Props {
    title: string,
    latest: c_latest[],
    recently: c_movie[]
};

const WatchLatest: React.FC<Props> = ({ title, latest, recently }) => {
    return (
        <div className="w-11/12 h-fit max-w-[1600px] flex flex-row">
            <div className="w-3/4 h-[600px] flex flex-col items-center">
                <div className="w-11/12 text-lg text-white font-bold">{title}</div>
                <div className="w-11/12 h-px bg-gray-100"></div>
                <div className="h-full overflow-auto w-11/12 flex flex-row flex-wrap my-4">
                    {
                        latest.map((v: c_latest ,index: Key | null | undefined) => {
                            return(
                                <div key={index} className="w-1/5 mb-4">
                                    <div className="w-11/12 h-72 bg-gray-500 rounded-lg relative">
                                        <img className="h-full rounded-lg" src={v.cover_image.url} />
                                        <div className="absolute top-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaBookmark className="text-xs text-white" />
                                        </div>
                                        <div className="absolute top-0 right-0 m-2 cursor-pointer bg-blue-900/50 rounded-full border-green-500 border-2">
                                            <div className="text-xs text-white py-2 px-1 font-semibold">10.0</div>
                                        </div>
                                        <a href={v._type == "serie" ?("/series/"+v._id) : ("/movies/"+v._id)} className="absolute bottom-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaAngleLeft className="text-xs text-white" />
                                        </a>
                                    </div>
                                    <div className="text-base font-bold text-white mt-2">{v.title}</div>
                                    <div className="w-full flex flex-row items-center flex-wrap">
                                        {
                                            v.categories.map((category,index) => {
                                                return (
                                                    <div key={index} className="text-xs font-semibold text-[#bababa] mr-2">{category.name}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-1/4 flex flex-col items-center">
                <div className="w-11/12 text-lg text-white font-bold">Recently Added</div>
                <div className="w-11/12 h-px bg-gray-100"></div>
                <div className="w-11/12 flex flex-row items-center my-4">
                {
                    recently.map((v,index) => {
                        return(
                            <div key={index} className="w-1/3 h-40 mb-16">
                                <div className="w-11/12 h-full bg-gray-500 rounded-lg"></div>
                                <div className="text-base font-bold text-white mt-2">{v.title}</div>
                                <div className="text-xs font-semibold text-[#bababa]">{v.title}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default WatchLatest;
