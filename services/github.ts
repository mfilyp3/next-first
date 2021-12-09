import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export function GitLogin(code: string = "") {
  if (!code) return;
  axios.post(
    `https://github.com/login/oauth/access_token/?client_id=d4b04cb851482fe95a18&client_secret=3647c714206ec9443d68679c5aeda6d8ca777a9f&code=${code}`,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
