import { SectionHeader } from "../SectionHeader";

interface Props {
    cover_image: string,
};

export default function Preview({ cover_image }: Props){
    return(
        <div className="w-11/12 flex flex-col items-center">
            <SectionHeader title="Preview" />
            <div className="w-11/12 flex flex-col items-center">
                <img src={cover_image} />
            </div>
        </div>
    )
}