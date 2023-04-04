import { SectionHeader } from "../SectionHeader";

interface Props {
    title: string,
    desc: string,
    setTitle: (state:string) => void,
    setDesc: (state:string) => void,
};

export default function TitleDesc({ title, setTitle, desc, setDesc }: Props){
    return(
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Title & Description" />
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
    )
}