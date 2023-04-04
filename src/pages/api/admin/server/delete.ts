import client from '@/database/connection';
import { c_server } from '@/types/client';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        res.status(200).json({ status: "error", message: "Not Implemented!" });
    }else{
        res.status(200).json({ status: "Not Found!", message: "Method not found!" });
    }
}
