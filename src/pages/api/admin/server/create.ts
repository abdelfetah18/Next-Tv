import client from '@/database/connection';
import { c_server } from '@/types/client';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        let server:c_server = req.body;
        client.createServer(server).then(response => {
            res.status(200).json({ status: "success", message: "server created successfuly!", data: response });
        }).catch(err => {
            res.status(200).json({ status: "error", message: "Something went wrong!", error: err });
        });
    }else{
        res.status(200).json({ status: "Not Found!", message: "Method not found!" });
    }
}
