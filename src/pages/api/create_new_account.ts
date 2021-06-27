import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

async function checkPassword(text: string) {
  const response = await fetch('http://localhost:3000/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({password: text}),
  });
  return await response.json();
}


export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const userName = JSON.parse(req.body).userName
  const password = JSON.parse(req.body).password
  checkPassword(password)
    .then(resp => {
      console.log(resp)
    })

  res.status(200).json({ result: true });
}
