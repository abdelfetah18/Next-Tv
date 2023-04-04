import axios from "axios";
import { SectionHeader } from "../SectionHeader";
import { c_asset } from "@/types/client";

interface Props {
    setCoverImage: (state:string) => void,
    setImageInfo: (state:c_asset) => void,
};

export default function Thumbnail({ setCoverImage, setImageInfo }: Props){
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
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Thumbnail" />
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
    )
}