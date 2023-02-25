import { Formidable } from "formidable";
import client from '@/database/connection';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
      bodyParser: false
    }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == "POST"){
        var form = new Formidable();
        form.parse(req,async ( err,fields, files) => {
            if(err){
                res.status(200).json({
                    status:"error",
                    message:"something went wrong!"
                });
            }else{
                let image = files["image"];
                client.upload_image(image.filepath).then(imgAsset => {        
                    res.status(200).json({ status: "success", image: imgAsset });
                });
            }
        });
    }else{
        res.status(200).json({ status: "Not Found!", message: "Method not found!" });
    }
}