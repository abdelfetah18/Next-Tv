import { c_movie, c_serie } from "@/types/client"
import { Key } from "react"
import { FaAngleLeft } from "react-icons/fa"

interface Props {
    type: string,
    latest: c_movie[] | c_serie[],
};

const Box: React.FC<Props> = ({ type, latest }) => {
    return (
        <div className="w-full flex-grow flex flex-row">
            <div className="w-full h-full flex flex-col items-center py-4">
                <div className="w-full h-px bg-gray-100"></div>
                <div className="w-full flex-grow overflow-auto flex flex-row flex-wrap my-4">
                    {
                        latest.map((v: c_movie | c_serie,index: Key | null | undefined) => {
                            return(
                                <div key={index} className="w-40 mb-4">
                                    <div className="w-11/12 h-60 bg-gray-500 rounded-lg relative">
                                        <img className="absolute top-0 left-0 h-full w-full rounded-lg" src={v.cover_image ? v.cover_image.url : "/3.png"} />
                                        <a href={"/admin/"+type+"/"+v._id} className="absolute bottom-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
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
                <div className="w-full h-px bg-gray-100"></div>
            </div>
        </div>
    )
}

export default Box;
