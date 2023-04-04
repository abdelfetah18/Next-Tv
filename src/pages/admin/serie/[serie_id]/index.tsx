import { CreateCategoryDialog } from "@/components/admin/CreateCategoryDialog";
import DropBox from "@/components/admin/DropBox";
import Navigation from "@/components/admin/Navigation";
import { SectionHeader } from "@/components/admin/SectionHeader";
import TitleDesc from "@/components/admin/Sections/TitleDesc";
import Duration from "@/components/admin/Sections/Duration";
import client from "@/database/connection";
import { c_category, c_serie } from "@/types/client";
import { s_serie } from "@/types/server";
import axios from "axios";
import { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import Categories from "@/components/admin/Sections/Categories";
import Thumbnail from "@/components/admin/Sections/Thumbnail";
import Preview from "@/components/admin/Sections/Preview";
import Episodes from "@/components/admin/Sections/Episodes";


export async function getServerSideProps(context:any){
    let serie_id: string = context.query.serie_id;

    // init Serie Document
    let doc: c_serie = await client.getSerieById(serie_id);

    if(doc == null){
        return {
            redirect: {
                destination: '/admin/dashboard', // TODO: Throw an error instead of redirecting or redirect to error page.
                permanent: false,
            },        
        }
    }

    return {
      props: { serie_doc: doc }
    }
}

interface Props {
    serie_doc: c_serie
};

export default function Create({ serie_doc }:Props){
    const [title,setTitle] = useState(serie_doc.title);
    const [desc,setDesc] = useState(serie_doc.description);
    const [categories,setCategories] = useState<c_category[]>(serie_doc.categories);
    const [image_info,setImageInfo] = useState(serie_doc.cover_image);
    const [cover_image,setCoverImage] = useState(serie_doc.cover_image ? serie_doc.cover_image.url : "/3.png");
    const [selected_category,setSelectedCategory] = useState<c_category>({} as c_category);
    const [duration,setDuration] = useState(serie_doc.duration);
    const [dialog_category_open,setDialogCategoryOpen] = useState(false);


    function publishOrSaveSerie(publish=false){
        let data: s_serie = { 
            _id: serie_doc._id,
            title,
            description: desc,
            categories: [],
            cover_image: { _type: "image", asset: { _type: "reference", _key: image_info._id, _ref: image_info._id } },
            duration,
            date: (new Date()).toLocaleString()
        };

        // Prepare categories
        for(let i = 0; i < categories.length; i++){
            data.categories.push({ _type: "reference", _ref: categories[i]._id, _key: categories[i]._id, });
        }

        axios.post(publish ? "/api/admin/serie/publish" : "/api/admin/serie/update", data).then((response) => {
            // TODO: Show a success message and redirect to serie page
            console.log(response.data);  
            if(response.data.status == "success"){
                window.location.pathname = "/series/"+response.data.data._id;
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

                <Navigation path={"create_serie"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Create</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 py-8 mb-8 rounded-lg flex flex-col items-center">
                        <TitleDesc title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} />
                        <Duration duration={duration} setDuration={setDuration} />
                        <Categories categories={categories} selected_category={selected_category} setCategories={setCategories} setDialogCategoryOpen={setDialogCategoryOpen} setSelectedCategory={setSelectedCategory} />
                        <Thumbnail setCoverImage={setCoverImage} setImageInfo={setImageInfo} />

                        <div className="w-11/12 flex flex-row items-center justify-center mt-8">
                            <div onClick={(ev) => { ev.preventDefault(); publishOrSaveSerie(false); }} className="px-6 py-1 mx-1 text-white font-bold rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">Save</div>
                            {
                                serie_doc._id.startsWith("drafts.") && (
                                    <div onClick={(ev) => { ev.preventDefault(); publishOrSaveSerie(true); }} className="px-8 py-1 mx-1 text-white font-bold rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer">Publish</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Episodes episodes={serie_doc.episodes} serie_id={serie_doc._id} />
                        <div className="w-11/12 my-2 h-fit flex flex-col items-center bg-gray-800 rounded-lg py-4">
                            <Preview cover_image={cover_image} />
                        </div>
                    </div>
                </div>
            </div>

            <CreateCategoryDialog isOpen={dialog_category_open} setIsOpen={setDialogCategoryOpen} />

        </div>
    )
}