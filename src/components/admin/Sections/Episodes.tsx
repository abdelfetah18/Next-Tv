import { c_episode } from "@/types/client";
import { SectionHeader } from "../SectionHeader";

interface Props {
    episodes: c_episode[],
    serie_id: string
};

export default function Episodes({ episodes, serie_id }: Props){
    return(
        <div className="w-11/12 flex flex-col items-center bg-gray-800 rounded-lg py-4">
            <div className="w-11/12">
                <SectionHeader title="Episodes" />
            </div>
            <div className="w-11/12 h-40 max-h-96 overflow-auto rounded-lg my-2 bg-gray-900 flex flex-col items-center">
                {
                    episodes.map((ep, index) => {
                        return (
                            <a href={"/admin/serie/"+serie_id+"/episode/"+ep._id} key={index} className="w-full text-center text-white text-sm font-bold py-2 hover:bg-gray-800/20 cursor-pointer">Episode {index+1}</a>
                        )
                    })
                }
                { episodes.length == 0 && (<div className="text-gray-300 text-xs font-semibold py-2 w-full text-center">No Episodes Yet !</div>)}
            </div>
            <a href={"/admin/serie/"+serie_id+"/episode/create"} className="w-11/12 my-2 text-center text-white text-sm font-bold py-2 rounded-lg bg-gray-900/40 hover:bg-gray-900/20 cursor-pointer">+ Add new episode</a>
        </div>
    )
}