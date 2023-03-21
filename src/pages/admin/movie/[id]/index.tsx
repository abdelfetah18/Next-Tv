import Card from "@/components/admin/Card";
import { CreateCategoryDialog } from "@/components/admin/CreateCategoryDialog";
import DropBox from "@/components/admin/DropBox";
import Navigation from "@/components/admin/Navigation";
import Categories from "@/components/admin/Sections/Categories";
import Duration from "@/components/admin/Sections/Duration";
import Preview from "@/components/admin/Sections/Preview";
import ServersInfo from "@/components/admin/Sections/ServersInfo";
import Thumbnail from "@/components/admin/Sections/Thumbnail";
import TitleDesc from "@/components/admin/Sections/TitleDesc";
import client from "@/database/connection";
import { c_category, c_movie, c_server } from "@/types/client";
import { s_movie } from "@/types/server";
import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";


export async function getServerSideProps(context:any){
    let movie_id: string = context.query.id;

    // init Movie Document
    let doc: c_movie = await client.getMovieById(movie_id);

    if(doc == null){
        return {
            redirect: {
                destination: '/admin/dashboard', // TODO: Throw an error instead of redirecting or redirect to error page.
                permanent: false,
            },        
        }
    }

    return {
      props: { movie_doc: doc }
    }
}

interface Props {
    movie_doc: c_movie
};

export default function Create({ movie_doc }:Props){
    const [title,setTitle] = useState(movie_doc.title);
    const [desc,setDesc] = useState(movie_doc.description);
    const [categories,setCategories] = useState<c_category[]>(movie_doc.categories);
    const [servers,setServers] = useState<c_server[]>(movie_doc.servers);
    const [image_info,setImageInfo] = useState(movie_doc.cover_image);
    const [cover_image,setCoverImage] = useState(movie_doc.cover_image ? movie_doc.cover_image.url : "/3.png");
    const [selected_category,setSelectedCategory] = useState<c_category>(movie_doc.categories.length > 0 ? movie_doc.categories[0] : { _id: "" , name:"test" });
    const [duration,setDuration] = useState(movie_doc.duration);
    const [dialog_category_open,setDialogCategoryOpen] = useState(false);

    function PublishOrSaveMovie(publish=false){
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
            data.categories.push({ _type: "reference", _ref: categories[i]._id, _key: categories[i]._id, });
        }

        // Prepare servers
        for(let i = 0; i < servers.length; i++){
            data.servers.push({ _type: "reference", _ref: servers[i]._id, _key: servers[i]._id, });
        }
        
        axios.post(publish ? "/api/admin/movie/publish" : "/api/admin/movie/update", data).then((response) => {
            // TODO: Show a success message and redirect to movie page
            if(response.data.status == "success"){
                console.log(response.data);
                if(publish)
                    window.location.pathname = "/movies/"+response.data.data._id;
            }            
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
                        <TitleDesc title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} />
                        <Duration duration={duration} setDuration={setDuration} />
                        <Categories categories={categories} selected_category={selected_category} setCategories={setCategories} setDialogCategoryOpen={setDialogCategoryOpen} setSelectedCategory={setSelectedCategory} />
                        <ServersInfo servers={servers} setServers={setServers} />
                        <Thumbnail setCoverImage={setCoverImage} setImageInfo={setImageInfo} />

                        <div className="w-11/12 flex flex-row items-center justify-center mt-8">
                            <div onClick={ev => { ev.preventDefault(); PublishOrSaveMovie(false); }} className="px-6 py-1 mx-1 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">Save</div>
                            {
                                movie_doc._id.startsWith("drafts.") && <div onClick={ev => { ev.preventDefault(); PublishOrSaveMovie(true); }} className="px-8 py-1 mx-1 text-white font-bold rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer">Publish</div>
                            }
                        </div>

                    </div>
                    <div className="w-1/3 h-fit bg-gray-800 rounded-lg mx-2 py-4 flex flex-col items-center">
                        <Preview cover_image={cover_image} />
                    </div>
                </div>
            </div>
            <CreateCategoryDialog isOpen={dialog_category_open} setIsOpen={setDialogCategoryOpen} />
        </div>
    )
}