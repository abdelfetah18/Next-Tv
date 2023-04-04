import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Props {
    list: any[],
    selected: any,
    setSelected: (state: any) => void
};

const DropBox = function ({ list, selected, setSelected }:Props){
    const [is_open,setIsOpen] = useState(false);

    return (
        <div tabIndex={1} onBlur={(ev) => { setIsOpen(false); }} className="w-full relative flex flex-col items-center">
            <div className="w-full rounded-lg bg-gray-700/50 flex flex-row items-center">
                <div onClick={(ev) => setIsOpen(state => !state)} className="text-white text-sm font-semibold px-4 py-2 w-full">{selected.name}</div>
                <FaAngleDown className="text-white text-base mx-2" />
            </div>
            {
                is_open ? (
                    <div className="absolute top-full w-full flex flex-col items-center bg-gray-700 rounded-lg">
                        {
                            list.map((item,index) => {
                                if(item.name != selected.name)
                                    return(
                                        <div onClick={(evt) => { console.log(item); setSelected(item);}} key={index} className="text-white text-sm font-semibold px-4 py-2 w-full cursor-pointer hover:bg-gray-800/50">{item.name}</div>
                                    )
                                return <></>
                            })
                        }
                    </div>
                ) : (<></>)
            }
        </div>
    )
}

export default DropBox;