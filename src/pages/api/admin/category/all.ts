import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    client.getCategories().then(response => {
        res.status(200).json({ status:"success", data: response });
    }).catch(err => {
        res.status(200).json({ status:"error", message: "something went wrong." });
    });
}
