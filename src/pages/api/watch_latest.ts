import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/connection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    client.getWatchLatest().then(watch_latest => {
        res.status(200).json({ status: "success", data: watch_latest });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong!", error: err });
    });
    
}
