import client from "@/database/connection";
import { c_movie } from "@/types/client";


export async function getServerSideProps() {
    // init Movie Document
    let doc: c_movie = await client.initMovieDoc();
    
    return {
        redirect: {
            destination: '/admin/movie/'+doc._id,
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