import { CreateCategoryDialog } from "@/components/admin/CreateCategoryDialog";
import Navigation from "@/components/admin/Navigation";
import { c_category, c_latest } from "@/types/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaPlay, FaPlus } from "react-icons/fa";

export default function Categories(){
    const [categories,setCategories] = useState<c_category[]>([]);
    const [selected_category,setSelectedCategory] = useState<c_category>({ _id: "", name:"action" });
    const [list,setList] = useState<c_latest[]>([]);
    const [dialog_category_open,setDialogCategoryOpen] = useState(false);

    useEffect(() => {
        getCategories();
        if(selected_category){
            axios.get("/api/admin/category/"+selected_category.name).then(response => {
                if(response.data.status == "success"){
                    setList(response.data.data);
                }
            }).catch(err => {
                console.log(err);
                // FIXME: handle erros.
            });
        }
    },[selected_category]);

    function getCategories(){
        axios.get("/api/admin/category/all").then(response => {
            if(response.data.status == "success"){
                setCategories(response.data.data);
            }
        }).catch(err => {
            // FIXME: handle errors.
            console.log(err);
        })
    }

    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation path={"categories"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl pt-8">Categoreis</div>
                <div className="w-11/12 flex-grow flex flex-col py-8">
                    <div className="w-full flex-grow flex flex-col items-center bg-gray-800 rounded">
                        <div className="w-full flex flex-row items-center bg-gray-900/40 rounded">
                            <div onClick={(ev) => setDialogCategoryOpen(true)} className="h-full rounded flex flex-row items-center px-4 cursor-pointer">
                                <FaPlus className="text-xs text-green-500 font-bold" />
                                <div className="text-sm text-green-500 font-bold pl-2">Create</div>
                            </div>
                        {
                            categories.map((c,i) => {
                                
                                function Select(){
                                    setSelectedCategory(c);
                                }

                                return(
                                    <div key={i} onClick={Select} className={"text-base font-semibold text-white px-4 py-2 rounded-t cursor-pointer hover:bg-gray-800/60 " + (selected_category.name == c.name ? "bg-gray-800" : "bg-gray-800/40")}>{c.name}</div>
                                )
                            })
                        }
                        </div>
                        <div className="w-11/12 flex flex-row flex-wrap flex-grow">
                            {
                                list.map((v:c_latest,i) => {
                                    return(
                                        <div key={i} className="w-40 my-4">
                                            <div className="w-11/12 h-60 bg-gray-500 rounded relative">
                                                <img className="absolute top-0 left-0 h-full w-full rounded" src={v.cover_image ? v.cover_image.url : "/3.png"} />
                                                <a href={"/admin/"+(v.servers ? "movie" : "serie") +"/"+v._id} className="absolute bottom-0 left-0 p-3 m-2 cursor-pointer bg-blue-900 rounded-full">
                                                    <FaAngleLeft className="text-xs text-white" />
                                                </a>
                                            </div>
                                            <div className="text-base font-bold text-white mt-2">{v.title}</div>
                                            <div className="w-full flex flex-row items-center flex-wrap">
                                                {
                                                    v.categories.map((category,index) => {
                                                        return (
                                                            <div key={index} className="text-xs font-semibold text-[#bababa] mr-2">{category.name}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CreateCategoryDialog isOpen={dialog_category_open} setIsOpen={setDialogCategoryOpen} />
        </div>
    )
}