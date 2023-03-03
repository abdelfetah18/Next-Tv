import Navigation from "@/components/admin/Navigation";
import Categories from "@/components/admin/Sections/Categories";
import Duration from "@/components/admin/Sections/Duration";
import ServersInfo from "@/components/admin/Sections/ServersInfo";
import Thumbnail from "@/components/admin/Sections/Thumbnail";
import TitleDesc from "@/components/admin/Sections/TitleDesc";
import client from "@/database/connection";
import { c_episode, c_server } from "@/types/client";
import { s_episode } from "@/types/server";
import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";


export async function getServerSideProps(context:any){
    let episode_id: string = context.query.episode_id;

    // init Episode Document
    let doc: c_episode = await client.getEpisodeById(episode_id);
    
    if(doc == null){
        return {
            redirect: {
                destination: '/admin/dashboard', // TODO: Throw an error instead of redirecting or redirect to error page.
                permanent: false,
            },        
        }
    }

    return {
      props: { episode_doc: doc }
    }
}

interface Props {
    episode_doc: c_episode
};

export default function Create({ episode_doc }:Props){
    const [title,setTitle] = useState(episode_doc.title);
    const [desc,setDesc] = useState(episode_doc.description);
    const [servers,setServers] = useState<c_server[]>(episode_doc.servers);
    const [image_info,setImageInfo] = useState(episode_doc.cover_image);
    const [cover_image,setCoverImage] = useState(episode_doc.cover_image?.url);
    const [duration,setDuration] = useState(episode_doc.duration);

    function createNewEpisode(){
        let data: s_episode = { 
            _id: episode_doc._id,
            serie: { _key: episode_doc.serie, _ref: episode_doc.serie, _type: "reference" },
            title,
            description: desc,
            servers: [],
            cover_image: { _type: "image", asset: { _type: "reference", _key: image_info._id, _ref: image_info._id } },
            duration,
            date: (new Date()).toLocaleString()
        };

        // Prepare servers
        for(let i = 0; i < servers.length; i++){
            // FIXME: I think this is not a save implementation. :)
            data.servers.push({ _type: "reference", _ref: servers[i]._id, _key: servers[i]._id, });
        }

        axios.post("/api/admin/episode/update", data).then((response) => {
            // TODO: Show a success message and redirect to episode page
            console.log(response.data);          
        });
    }

    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation path={"create_episode"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Create</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 py-8 mb-8 rounded-lg flex flex-col items-center">
                        <TitleDesc title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} />
                        <Duration duration={duration} setDuration={setDuration} />
                        <ServersInfo servers={servers} setServers={setServers} />
                        <Thumbnail setCoverImage={setCoverImage} setImageInfo={setImageInfo} />


                        <div className="w-11/12 flex flex-row items-center justify-center mt-8">
                            <div onClick={createNewEpisode} className="px-6 py-1 mx-1 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">Save</div>
                            <div onClick={createNewEpisode} className="px-8 py-1 mx-1 text-white font-bold rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer">Publish</div>
                        </div>

                    </div>
                    <div className="w-1/3 h-fit bg-gray-800 rounded-lg mx-2 py-4 flex flex-col items-center">
                        <div className="w-11/12 py-4 flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="py-4 px-2 rounded bg-emerald-300"></div>
                                <div className="text-lg text-white font-bold ml-2">Preview</div>
                            </div>
                        </div>
                        <div className="w-11/12 flex flex-col items-center">
                            <img src={cover_image} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}