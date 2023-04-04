import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/database/connection';
import { c_user } from '@/types/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        let user: c_user = req.body;
        client.SignUp(user).then(user => {
            if(user){
                res.status(200).json({ status: "success", data: user });
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
