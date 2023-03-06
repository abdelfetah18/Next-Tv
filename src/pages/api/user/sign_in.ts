import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';
import { c_user_credentials } from '@/types/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        let user_cred: c_user_credentials = req.body;
        client.SignIn(user_cred).then(session => {
            if(session){
                res.status(200).json({ status: "success", data: session });
            }else{
                res.status(200).json({ status: "error", message: "bad credentials!" });
            }
        }).catch(err => {
            res.status(200).json({ status: "error", message: "something went wrong!" });
        });
    }else{
        res.status(200).json({ status: "not_found", message: "method not allowed!" });
    }
}
