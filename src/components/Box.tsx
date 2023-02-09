interface Props {
    title: string,
    items: Array<any>,
    selected: any,
    setSelected: Function,
};

const Box:React.FC<Props> = function({ title, items, selected, setSelected }){

    return(
        <div className="self-end w-full h-full flex flex-col bg-gray-900 rounded-lg pb-2">
            <div className="px-4 py-2 text-white text-lg font-bold border-b-2">{title}:</div>
            <div className="w-full h-full flex flex-col overflow-auto">
                {
                    items.map((item, index) => {
                        function onClick(){
                            setSelected(item);
                        }
                        return (<div key={index} onClick={onClick} className={"cursor-pointer px-8 py-2 text-white text-sm font-medium hover:bg-gray-800"+ (selected == item ? " bg-gray-800/40" : "")}>{item.name}</div>)
                    })
                }    
            </div>
        </div>
    )
}

export default Box;