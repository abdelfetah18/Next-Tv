import { c_category } from "@/types/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import DropBox from "../DropBox";
import { SectionHeader } from "../SectionHeader";

interface Props {
    categories: c_category[],
    setCategories: (callback:((state:c_category[]) => c_category[])) => void,
    selected_category: c_category,
    setSelectedCategory: (callback:((state:c_category) => c_category)) => void,
    setDialogCategoryOpen: (callback:((state:boolean) => boolean) | boolean) => void
};

export default function Categories({ categories, setCategories, selected_category, setSelectedCategory, setDialogCategoryOpen }: Props){
    const [other_categories,setOtherCategories] = useState([]);

    useEffect(() => {
        getOtherCategories();
    },[]);

    function getOtherCategories(){
        axios.get("/api/admin/category/all").then(response => {
            if(response.data.status == "success"){
                setOtherCategories(response.data.data);
                if(response.data.data.length > 0){
                    setSelectedCategory(response.data.data[0]);
                }
            }else{
                // FIXME: show error message.
            }
        }).catch(err => {
            console.log(err);
            // FIXME: handle errors.
        });
    }

    function addCategory(ev:any){
        ev.preventDefault();
        setCategories(state => [selected_category,...state]);
    }

    return(
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Categories" />
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
                            <DropBox list={other_categories} selected={selected_category} setSelected={setSelectedCategory} />
                        </div>
                        <div onClick={addCategory} className="px-8 py-2 text-sm text-white font-bold bg-green-600 rounded-lg cursor-pointer">Add</div>
                    </div>
                    <div className="w-full flex flex-col items-center my-4">
                        <div onClick={(ev) => setDialogCategoryOpen(true) } className="cursor-pointer px-20 py-2 bg-gray-700 hover:bg-gray-700/60 rounded-lg text-sm text-white font-bold text-center">Create new categorie</div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}