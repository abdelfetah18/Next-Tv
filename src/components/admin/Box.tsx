import { Key } from "react"
import { FaAngleLeft, FaBookmark } from "react-icons/fa"

import { Video, Thumb } from "@/types/client";

interface Props {
    title: string,
    latest: Video[],
};

const Box: React.FC<Props> = ({ title, latest }) => {
    return (
        <div className="w-full flex flex-row">
            <div className="w-full flex flex-col items-center py-4">
                <div className="w-11/12 h-px bg-gray-100"></div>
                <div className="h-full overflow-auto w-11/12 flex flex-row flex-wrap my-4">
                    {
                        latest.map((v: Video ,index: Key | null | undefined) => {
                            return(
                                <div key={index} className="w-1/5 mb-4">
                                    <div className="w-11/12 h-80 bg-gray-500 rounded-lg relative">
                                        <div className="absolute top-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaBookmark className="text-xs text-white" />
                                        </div>
                                        <div className="absolute top-0 right-0 m-2 cursor-pointer bg-blue-900/50 rounded-full border-green-500 border-2">
                                            <div className="text-xs text-white py-2 px-1 font-semibold">10.0</div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                            <FaAngleLeft className="text-xs text-white" />
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-white mt-2">{v.title}</div>
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
                <div className="w-11/12 h-px bg-gray-100"></div>
            </div>
        </div>
    )
}

export default Box;
