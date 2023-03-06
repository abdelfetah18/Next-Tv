import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';
import { c_user_credentials } from '@/types/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.headers.authorization == undefined){
        res.status(200).json({ status: "error", message: "no authorization header found or you already out!" });
    }else{
        let base64_session_id = req.headers.authorization;
        // decode Base64 to ascii
        let session_id = Buffer.from(base64_session_id).toString('ascii');
        client.SignOut(session_id).then(() => {
            res.status(200).json({ status: "success", message:"sign out successfumy!" });
        }).catch(err => {
            res.status(200).json({ status: "error", message: "something went wrong!" });
        });
    }
}
