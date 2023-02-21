import { useState } from "react"
import { FaArrowDown, FaArrowUp, FaEye, FaUser } from "react-icons/fa"

export default function Card(){
    // TODO: Do some transtion when the selected Tab got changed.
    const [selectedTab,setSelectedTab] = useState("Views");

    return(
        <div className="w-full flex flex-col items-center">
            <div className="w-full py-4 flex flex-row items-center">
                <div className="flex flex-row items-center">
                    <div className="py-4 px-2 rounded bg-blue-600"></div>
                    <div className="text-lg text-white font-bold ml-2">Overview</div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-row items-center my-4 bg-gray-900 rounded-lg">
                    <Tab Icon={FaUser} onClick={setSelectedTab} is_selected={selectedTab == "Users"} title={"Users"} value={"124"} percent={"7.8%"} percent_state={"down"} />
                    <Tab Icon={FaEye} onClick={setSelectedTab} is_selected={selectedTab == "Views"} title={"Views"} value={"12546"} percent={"5.9%"} percent_state={"up"} />
                </div>
                { selectedTab == "Views" ? (<ViewsGraph />) : (<NewUsers />) }
            </div>
        </div>
    )
}

const Tab = ({ Icon, onClick, is_selected, title, value, percent, percent_state }) => {
    return(
        <div onClick={(ev) => onClick(title)} className="w-1/2 flex flex-col items-center p-2">
            <div className={"w-full flex flex-col items-center rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700/20 "+(is_selected ? "bg-gray-800":"")}>
                <div className="w-full flex flex-row items-center justify-end">
                    <div className={"self-end flex flex-row items-center font-bold text-xs bg-gray-800 px-2 py-1 rounded-lg "+ (percent_state == "up" ? "text-green-500" : "text-red-500")}>
                        {
                            percent_state == "up" ? (<FaArrowUp className="mr-1" />) : (<FaArrowDown className="mr-1" />)
                        }
                        {percent}
                    </div>
                </div>
                <div className="w-full flex flex-row items-center">
                    <div className="text-white text-5xl"><Icon /></div>
                    <div className="mx-4 flex flex-col flex-grow">
                        <div className="text-base font-mono font-bold text-gray-400">{title}</div>
                        <div className="text-3xl font-mono font-bold text-white">{value}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewUsers = () => {
    return(
        <div className="w-full flex flex-col items-center">
            <div className="w-full text-lg font-bold text-white">Users</div>
            <div className="w-11/12 flex flex-row items-center justify-between my-4">
                {
                    [0,1,2,3,4].map((u,i) => {
                        return(
                            <div key={i} className="flex flex-col items-center mr-8">
                                <div className="flex flex-col items-center justify-center bg-white rounded-full h-14 w-14 mb-2">
                                        <FaUser className="text-xl"/>
                                </div>
                                <div className="text-white text-sm font-mono">username</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ViewsGraph = () => {
    return(
        <div className="w-full flex flex-col items-center">
            <div className="text-white">Views Graph</div>
        </div>
    )
}