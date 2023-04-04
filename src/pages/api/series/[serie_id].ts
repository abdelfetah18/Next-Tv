import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let serie_id = req.query.serie_id;
    client.getSerieById(serie_id as string).then(serie => {
        res.status(200).json({ status: "success", data: serie });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong!", error: err });
    });
}
