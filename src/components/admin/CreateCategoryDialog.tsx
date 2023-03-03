import { FaTimes } from "react-icons/fa";

interface Props {
    isOpen: boolean;
    setIsOpen: (state:boolean) => void;
};


// TODO: implement a FadeIn Animation.
export function CreateCategoryDialog({ isOpen, setIsOpen }:Props){
    return isOpen ? (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black/60 flex flex-col items-center justify-center">
            <div className="w-1/2 bg-gray-800 rounded-lg flex flex-col items-center py-4">
                <div className="w-11/12 flex flex-row items-center justify-between">
                    <div className="text-xl text-white font-bold">Create Category</div>
                    <div onClick={(ev) => setIsOpen(false) } className="text-xl text-white cursor-pointer hover:text-gray-300"><FaTimes /></div>
                </div>
                <div className="w-11/12 flex flex-col items-center my-8">
                    <input className="focus:outline-none w-4/5 px-4 py-1 rounded-lg bg-gray-700/50 text-gray-200 mb-4" type={"text"} placeholder="category" />
                    <div className="text-white font-bold px-4 py-1 bg-green-600 rounded-lg cursor-pointer">Create</div>
                </div>
            </div>
        </div>
    ) : <></>
}