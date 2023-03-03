interface Props {
    title: string,
};

export function SectionHeader({ title }: Props){
    return (
        <div className="w-full pb-4 flex flex-row items-center">
            <div className="flex flex-row items-center">
                <div className="py-4 px-2 rounded bg-blue-500"></div>
                <div className="text-lg text-white font-bold ml-2">{title}</div>
            </div>
        </div>
    )
}