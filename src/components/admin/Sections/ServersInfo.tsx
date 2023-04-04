import { c_server } from "@/types/client";
import { s_server } from "@/types/server";
import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SectionHeader } from "../SectionHeader";

interface Props {
    servers: c_server[],
    setServers: (callback:((state:c_server[]) => c_server[])) => void,
};

export default function ServersInfo({ servers, setServers }: Props){
    const [server_name,setServerName] = useState("");
    const [server_url,setServerUrl] = useState("");
    
    function addServer(ev:any){
        ev.preventDefault();
        let c: s_server = { name: server_name, url: server_url, date: (new Date()).toDateString() };
        axios.post("/api/admin/server/create", c).then(response => {    
            if(response.data.status === "success"){
                setServers(state => [response.data.data as c_server,...state]);
                setServerName("");
                setServerUrl("");
            }else{
                // FIXME: show a error message
                console.log(response.data);
            }
        });
    }

    return(
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Servers & Info" />
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 flex flex-col items-center">
                    <div className="w-full bg-gray-900/40 rounded-lg p-4 flex flex-row items-center flex-wrap">
                        { servers.length == 0 && (<div className="text-gray-400 font-bold text-sm">No items</div>)}
                        {
                            servers.map((s,index) => {

                                function removeServer(ev:any){
                                    ev.preventDefault();
                                    setServers(state => {
                                        let list = state.filter(i => i.name != s.name && i.url == s.url);
                                        return list;
                                    });
                                }

                                return(
                                    <div key={index} className="px-3 py-1 flex flex-row items-center bg-gray-800 rounded-full mr-2 mb-2" >
                                        <div className="text-white font-semibold mr-2">{s.name}</div>
                                        <FaTimes onClick={removeServer} className="cursor-pointer text-gray-300 text-sm font-semibold" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-full flex flex-row items-center my-4">
                        <input value={server_name} onChange={(ev) => { setServerName(ev.target.value); }} className="focus:outline-none flex-1 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Name" />
                        <input value={server_url} onChange={(ev) => { setServerUrl(ev.target.value); }} className="focus:outline-none flex-1 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Url" />
                        <div onClick={addServer} className="px-8 py-2 text-sm text-white font-bold bg-green-600 rounded-lg cursor-pointer">Add</div>
                    </div>
                </div>
            </div>
        </div>
    )
}