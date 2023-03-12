import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        let query = req.body.query;
        client.search(query).then(result => {
            res.status(200).json({ status: "success", data: result });
        }).catch(err => {
            res.status(200).json({ status: "error", message: "Something went wrong", error: err });
        });
    }else{
        res.status(200).json({ status: "not_found", message: "Method not foud!" });
    }
}
