import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    client.getLatestSeries().then(series => {
        res.status(200).json({ status: "success", data: series });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong!", error: err });
    });
}
