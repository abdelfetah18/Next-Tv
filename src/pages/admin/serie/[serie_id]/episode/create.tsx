import client from "@/database/connection";
import { c_episode } from "@/types/client";


export async function getServerSideProps(context:any) {
    let serie_id = context.query.serie_id;
    // init Episode Document
    let doc: c_episode = await client.initEpisodeDoc(serie_id);
    
    return {
        redirect: {
            destination: '/admin/serie/'+serie_id+'/episode/'+doc._id,
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