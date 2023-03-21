import client from '@/database/connection';
import { s_movie } from '@/types/server';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        let movie:s_movie = req.body;
        client.updateMovie(movie).then((result) => {
            res.status(200).json({ status: "success", data: result });
        });
    }else{
        res.status(200).json({ status: "Not Found!", message: "Method not found!" });
    }
}
