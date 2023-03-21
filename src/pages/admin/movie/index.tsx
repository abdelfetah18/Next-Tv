import Box from "@/components/admin/Box";
import Navigation from "@/components/admin/Navigation";
import { FaPlay } from "react-icons/fa";
import client from "@/database/connection";
import { c_movie } from "@/types/client";

export async function getServerSideProps() {
    // Fetch All the Movies
    let movies: c_movie[] = await client.getMovies();

    return {
        props: { movies }
    }
}

interface Props {
    movies: c_movie[]
};

export default function Serie({ movies }:Props){
    return(
        <div className="w-screen h-screen bg-gray-900 flex flex-row flex-wrap">
            <div className="w-1/5 h-full bg-gray-800/40 flex flex-col items-center">
                <div className="flex flex-row items-center my-4">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </div>

                <Navigation path={"movies"} />
            </div>
            <div className="w-4/5 h-full overflow-auto flex flex-col items-center">
                <div className="w-11/12 text-white font-bold text-3xl py-8">Movies</div>
                <div className="w-11/12 flex-grow flex flex-col">
                    <div className="w-full text-gray-300 font-bold text-lg">Published:</div>
                    <Box type="movie" latest={movies} />
                </div>
            </div>
        </div>
    )
}