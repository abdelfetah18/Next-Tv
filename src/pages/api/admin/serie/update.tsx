import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        let serie = req.body;
        
        client.updateSerie(serie).then((result) => {
            res.status(200).json({ status: "success", data: result });
        });
    }else{
        res.status(200).json({ status: "Not Found!", message: "Method not found!" });
    }
}
