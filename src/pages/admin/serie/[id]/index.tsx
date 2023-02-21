import Card from "@/components/admin/Card";
import Navigation from "@/components/admin/Navigation";
import { FaPlay } from "react-icons/fa";

export default function Create(){
    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Add new episode</div>
                <div className="w-11/12 flex flex-row">
                    <div className="w-2/3 bg-gray-800 py-8 mb-8 rounded-lg flex flex-col items-center">
                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full pb-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Serie & Info</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12 my-2">
                                    <div className="w-full flex flex-row  items-end">
                                        <div className="text-white text-base font-bold pb-1">Title:</div>
                                        <div className="text-gray-300 text-sm font-bold pb-1 mx-4">Detective conan</div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                        <input className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" placeholder="Title" />
                                    </div>
                                </div>
                                <div className="w-11/12 my-2">
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold pb-1">Description</div>
                                        <textarea className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-11/12 flex flex-col items-center">
                            <div className="w-full py-4 flex flex-row items-center">
                                <div className="flex flex-row items-center">
                                    <div className="py-4 px-2 rounded bg-blue-500"></div>
                                    <div className="text-lg text-white font-bold ml-2">Server & Info</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-11/12">
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold py-1">Name</div>
                                        <input className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" placeholder="Name" />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-white text-base font-bold py-2">Url</div>
                                        <input className="focus:outline-none w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200" placeholder="Url" />
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
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div> 

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 h-fit bg-gray-800 rounded-lg mx-2 py-4 flex flex-col items-center">
                        <div className="w-11/12 py-4 flex flex-row items-center">
                            <div className="flex flex-row items-center">
                                <div className="py-4 px-2 rounded bg-emerald-300"></div>
                                <div className="text-lg text-white font-bold ml-2">Preview</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}