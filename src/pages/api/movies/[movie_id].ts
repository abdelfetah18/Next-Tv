import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let movie_id = req.query.movie_id;
    client.getMovieById(movie_id as string).then(movie => {
        res.status(200).json({ status: "success", data: movie });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong!", error: err });
    });
}
