import client from '@/database/connection';
import { s_movie } from '@/types/server';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { category } = req.query;
    client.getByCategory(category as string).then(response => {
        res.status(200).json({ status:"success", data: response });
    }).catch(err => {
        res.status(200).json({ status:"error", message: "something went wrong.", error: err });
    });
}
