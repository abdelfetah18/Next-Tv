import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    client.getLatestMovies().then(movies => {
        res.status(200).json({ status: "success", data: movies });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong!", error: err });
    });
}
