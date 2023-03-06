import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        let movie = req.body;

        client.updateMovie(movie).then((result) => {
            res.status(200).json({ status: "success", data: result });
        }).catch(err => {
            res.status(200).json({ status: "error", message: "something went wrong!", error: err });
        });
    }else{
        res.status(200).json({ status: "not_found", message: "Method not found!" });
    }
}
