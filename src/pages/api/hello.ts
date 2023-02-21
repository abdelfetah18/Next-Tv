import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from "crypto";
import client from '../../database/connection';

type Data = {
  session_id: string,
  user: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  var user = client.getUser("cddf209e-460b-455d-bea9-8500a09fddf9");
  user.then((user) => {
    res.status(200).json({ session_id: crypto.randomUUID(), user });
  });
}
