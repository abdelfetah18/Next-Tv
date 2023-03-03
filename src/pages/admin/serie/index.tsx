import Box from "@/components/admin/Box";
import Navigation from "@/components/admin/Navigation";
import { FaPlay } from "react-icons/fa";
import { c_serie } from "@/types/client";
import client from "@/database/connection";

export async function getServerSideProps() {
    // Fetch All the Series
    let series: c_serie[] = await client.getSeries();

    return {
        props: { series }
    }
}

interface Props {
    series: c_serie[]
};

export default function Serie({ series }: Props){
    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation path={"serie"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Series</div>
                <div className="w-11/12 flex-grow flex flex-row">
                    <Box type="serie" latest={series} />
                </div>
            </div>
        </div>
    )
}