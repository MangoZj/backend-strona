export const API_URL = "https://backend-strona.vercel.app";

export default function handler(req, res) {
    res.status(200).json({ message: "API działa poprawnie!" });
  }
  
  
  