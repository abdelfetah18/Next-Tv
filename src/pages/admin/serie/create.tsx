import client from "@/database/connection";
import { c_serie } from "@/types/client";


export async function getServerSideProps() {
    // init Serie Document
    let doc: c_serie = await client.initSerieDoc();
    
    return {
        redirect: {
            destination: '/admin/serie/'+doc._id,
            permanent: false,
        },
    }
}

export default function Create(){
    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="text-white font-mono font-bold"><a href="/admin/dashboard">Dashboard</a></div>
        </div>
    )
}