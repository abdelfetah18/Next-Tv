import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';

async function  getData() {
    let views = await client.getViews();
    let users = await client.getUsers();
    let popular_videos = await client.getPopularVideos();
    return { views, users, popular_videos };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    getData().then(result => {
        res.status(200).json({ status: "success", data: result });
    }).catch(err => {
        res.status(200).json({ status: "error", message: "something went wrong." });
    });
}
