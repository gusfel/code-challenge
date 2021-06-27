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

const checkUN = str => {
  let validUN = new RegExp("(?=.{10,50})")
  return validUN.test(str)
}

const checkPW = str => {
  let validPW = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#\$%])(?=.{20,50})")
  return validPW.test(str)
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const userName = JSON.parse(req.body).userName
  const password = JSON.parse(req.body).password
  checkPassword(password)
    .then(resp => {
      if(resp.result) {
        res.status(200).json({ result: false });
      } else {
        if (checkPW(password) && checkUN(userName)) {
          res.status(200).json({ result: true });
        } else {
          res.status(200).json({ result: false })
        }
      }
    })


}
