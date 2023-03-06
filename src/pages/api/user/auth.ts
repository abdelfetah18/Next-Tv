import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';
import { c_user_credentials } from '@/types/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.headers.authorization == undefined){
        res.status(200).json({ status: "error", message: "no authorization header found!" });
    }else{
        let base64_session_id = req.headers.authorization;
        // decode Base64 to ascii
        let session_id = Buffer.from(base64_session_id).toString('ascii');
        client.Auth(session_id).then(session => {
            if(session.length > 0){
                res.status(200).json({ status: "success", data: session });
            }else{
                res.status(200).json({ status: "error", message: "bad session" });
            }
        }).catch(err => {
            res.status(200).json({ status: "error", message: "something went wrong!" });
        });
    }
}
