import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) return res.status(404).send(``);

  const response = await axios.post(
    `https://github.com/login/oauth/access_token/?client_id=d4b04cb851482fe95a18&client_secret=3647c714206ec9443d68679c5aeda6d8ca777a9f&code=${code}`,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
  const access_token = response.data.split("&")[0];
  return res.status(200).send(access_token);
}
