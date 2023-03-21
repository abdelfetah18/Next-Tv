import { SectionHeader } from "../SectionHeader";

interface Props {
    duration: string,
    setDuration: (callback:((state:string) => string)) => void,
};

export default function Duration({ duration, setDuration }: Props){
    
    function onDurationChange(ev:any){
        let target = ev.target.alt;
        let value = ev.target.value;
        if(target === 'h')
            setDuration(state => {
                let match = state.match(/\d*(?=h)/g);
                return state.replace(match ? match[0]+target : ""+target,value+target);
            });
        else
            setDuration(state => {
                let match = state.match(/\d*(?=m)/g);
                return state.replace(match ? match[0]+target : ""+target,value+target);
            });
    }

    return(
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Duration" />
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 my-2">
                    <div className="w-full">
                        <div className="text-white text-base font-bold pb-1">Duration</div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center">
                                <input onChange={onDurationChange} alt={"h"} defaultValue={duration.match(/\d*(?=h)/g)?.[0]} className="focus:outline-none px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Hours" type="number" min="0" step="1"/>
                                <div className="text-base text-gray-300 font-semibold mr-4">Hours</div>
                            </div>
                            <div className="flex flex-row items-center">
                                <input onChange={onDurationChange} alt={"m"} defaultValue={duration.match(/\d*(?=m)/g)?.[0]} className="focus:outline-none px-4 py-2 rounded-lg bg-gray-700/50 text-gray-200 mr-2" placeholder="Minutes" type="number" min="0" step="1"/>
                                <div className="text-base text-gray-300 font-semibold mr-4">Minutes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}