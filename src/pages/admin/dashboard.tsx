import Card from "@/components/admin/Card";
import Navigation from "@/components/admin/Navigation";
import AlertMessage from "@/components/AlertMessage";
import { c_latest } from "@/types/client";
import { s_users } from "@/types/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowDown, FaHome, FaPlay, FaPlus, FaUser } from "react-icons/fa";

export default function Dashboard(){
    const [views,setViews] = useState(0);
    const [users,setUsers] = useState<s_users>({} as s_users);
    const [popular_videos,setPopularVideos] = useState<c_latest[]>([]);
    const [alert_message,setAlertMessage] = useState("");


    useEffect(() => {
        getDashboardInfo();
    },[]);

    function getDashboardInfo(){
        axios.get("/api/admin/get_dashboard_info").then(response => {
            if(response.data.status == "success"){
                setUsers(response.data.data.users);
                setViews(response.data.data.views);
                setPopularVideos(response.data.data.popular_videos);
            }else{
                // Show error message.
                setAlertMessage(response.data.message);
            }
        }).catch(err => {
            console.log({ err });
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

                <Navigation path={"dashboard"} />
            </div>
            <div className="w-4/5 flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Dashboard</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 rounded-lg py-4 flex flex-col items-center">
                        <div className="w-11/12 flex flex-col items-center">
                            <Card users={users} views={views} />
                        </div>
                    </div>
                    <div className="w-1/3 bg-gray-800 rounded-lg mx-2 py-4 flex flex-col items-center">
                        <div className="w-11/12 py-4 flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="py-4 px-2 rounded bg-emerald-300"></div>
                                <div className="text-lg text-white font-bold ml-2">Popular videos</div>
                            </div>
                        </div>
                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full flex flex-row items-center">
                                <div className="px-4 text-xs font-bold text-gray-400 flex-grow">Videos</div>
                                <div className="px-4 text-xs font-bold text-gray-400">Views</div>
                            </div>
                            <div className="h-px w-full bg-gray-400/20 my-4"></div>
                        </div>
                        <div className="w-11/12 flex flex-col items-center">
                            {
                                popular_videos.map((v, index) => {
                                    return(
                                        <div key={index} className="w-11/12 flex flex-row mb-2 cursor-pointer rounded-lg hover:bg-gray-900/30">
                                            <div className="w-16 h-24 rounded-lg bg-gray-900">
                                                <img className="w-full h-full object-cover rounded" src={v.cover_image ? v.cover_image.url : "/thumb.jpg"} alt="cover_image" />
                                            </div>
                                            <div className="flex-grow flex flex-row items-center">
                                                <div className="h-full flex flex-col flex-grow px-4 py-2">
                                                    <div className="text-base font-bold text-white">{v.title}</div>
                                                </div>
                                                <div className="text-xs font-semibold text-gray-200/60">2003</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <AlertMessage message={alert_message} />
        </div>
    )
}