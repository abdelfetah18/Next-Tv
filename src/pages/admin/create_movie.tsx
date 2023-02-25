import Card from "@/components/admin/Card";
import DropBox from "@/components/admin/DropBox";
import Navigation from "@/components/admin/Navigation";
import client from "@/database/connection";
import { c_category, c_movie, c_server } from "@/types/client";
import { s_movie, s_server } from "@/types/server";
import axios from "axios";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";

// FIXME: Instead of making this page creating the Movie Document Redirect to dynamic path '/admin/movie/[id]/edit'

export async function getServerSideProps() {
    // init Movie Document
    let doc: c_movie = await client.initMovieDoc();
    
    return {
      props: { movie_doc: doc }
    }
}

interface Props {
    movie_doc: c_movie
};

export default function Create({ movie_doc }:Props){
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [categories,setCategories] = useState<c_category[]>([] as c_category[]);
    const [servers,setServers] = useState<c_server[]>([] as c_server[]);
    const [server_name,setServerName] = useState("");
    const [server_url,setServerUrl] = useState("");
    const [image_info,setImageInfo] = useState({} as any);
    const [cover_image,setCoverImage] = useState("/3.png");
    const [selected_category,setSelectedCategory] = useState<c_category>({ name: "action "} as c_category);
    const [duration,setDuration] = useState("0h 0m");

    function createNewMovie(){
        let data: s_movie = { 
            _id: movie_doc._id,
            title,
            description: desc,
            servers: [],
            categories: [],
            cover_image: { _type: "image", asset: { _type: "reference", _key: image_info._id, _ref: image_info._id } },
            duration,
            date: (new Date()).toLocaleString()
        };

        // Prepare categories
        for(let i = 0; i < categories.length; i++){
            // FIXME: I think this is not a save implementation. :)
            data.categories.push({ _type: "reference", _ref: categories[i]._id, _key: categories[i]._id, });
        }

        // Prepare servers
        for(let i = 0; i < servers.length; i++){
            // FIXME: I think this is not a save implementation. :)
            data.servers.push({ _type: "reference", _ref: servers[i]._id, _key: servers[i]._id, });
        }

        axios.post("/api/admin/movie/update", data).then((response) => {
            // TODO: Show a success message and redirect to movie page
            console.log(response.data);            
        });
    }

    function onDurationChange(ev:any){
        let target = ev.target.alt;
        let value = ev.target.value;
        if(target === 'h')
            setDuration(state => state.replace(/[0-9]+h/g, value+target));
        else
            setDuration(state => state.replace(/[0-9]+m/g, value+target));
    }

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

    function addCategory(ev:any){
        ev.preventDefault();
        setCategories(state => [selected_category,...state]);
    }

    function uploadImage(evt:any){
        let form = new FormData();
        form.append("image", evt.target.files[0]);
        axios.post("/api/admin/upload_image",form,{ headers: { "Content-Type": "multipart/form-data" } }).then(response => {
            console.log(response.data.image);
            let image = response.data.image;
            setCoverImage(image.url);
            setImageInfo(image);
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

                <Navigation path={"create_movie"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Create</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 py-8 mb-8 rounded-lg flex flex-col items-center">
                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full pb-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Title & Description</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12 my-2">
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold pb-1">Title</div>
                                        <input value={title} onChange={(ev) => { setTitle(ev.target.value); }} className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" placeholder="Title" />
                                    </div>
                                </div>
                                <div className="w-11/12 my-2">
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold pb-1">Description</div>
                                        <textarea value={desc} onChange={(ev) => { setDesc(ev.target.value); }} className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full pb-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Duration</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12 my-2">
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold pb-1">Duration</div>
                                        <div className="w-full flex flex-row items-center justify-between">
                                            <div className="flex flex-row items-center">
                                                <input onChange={onDurationChange} alt={"h"} defaultValue={"0"} className="focus:outline-none px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Hours" type="number" min="0" step="1"/>
                                                <div className="text-base text-gray-300 font-semibold mr-4">Hours</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <input onChange={onDurationChange} alt={"m"} defaultValue={"0"} className="focus:outline-none px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Minutes" type="number" min="0" step="1"/>
                                                <div className="text-base text-gray-300 font-semibold mr-4">Minutes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full py-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Categories</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12 flex flex-col items-center">
                                    <div className="w-full bg-gray-900/40 rounded-lg p-4 flex flex-row items-center flex-wrap">
                                        { categories.length == 0 && (<div className="text-gray-400 font-bold text-sm">No items</div>)}
                                        {
                                            categories.map((c,index) => {
     
                                                function removeCategory(ev:any){
                                                    ev.preventDefault();
                                                    setCategories(state => {
                                                        let list = state.filter(i => i.name != c.name);
                                                        return list;
                                                    });
                                                }

                                                return(
                                                    <div key={index} className="px-3 py-1 flex flex-row items-center bg-gray-800 rounded-full mr-2 mb-2" >
                                                        <div className="text-white font-semibold mr-2">{c.name}</div>
                                                        <FaTimes onClick={removeCategory} className="cursor-pointer text-gray-300 text-sm font-semibold" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="w-full flex flex-row items-center my-4">
                                        <div className="mr-2 flex-grow">
                                            <DropBox list={[{ name: "drama" },{ name: "romantic" },{ name: "action" }]} selected={selected_category} setSelected={setSelectedCategory} />
                                        </div>
                                        <div onClick={addCategory} className="px-8 py-2 text-sm text-white font-bold bg-green-600 rounded-lg cursor-pointer">Add</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full py-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Servers & Info</div>
                                </div>
                            </div>
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

                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full py-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Thumbnail</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12">
                                    <div className="w-full">                                        
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={uploadImage} />
                                            </label>
                                        </div> 

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-11/12 flex flex-row items-center justify-center mt-8">
                            <div onClick={createNewMovie} className="px-6 py-1 mx-1 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">Save</div>
                            <div onClick={createNewMovie} className="px-8 py-1 mx-1 text-white font-bold rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer">Publish</div>
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