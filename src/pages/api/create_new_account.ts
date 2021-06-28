import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  userName: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: string;
}

async function checkPassword(text: string) {
  const response = await fetch('http://localhost:3000/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({password: text}),
  });
  return await response.json();
}

const checkUN = str => {
  let validUN = new RegExp("^(?=.*[a-zA-z])(?=.{10,50}$)")
  return validUN.test(str);
}

const checkPW = str => {
  let validPW = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#\$%])(?=.{20,50}$)")
  return validPW.test(str);
}


export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { userName }: CreateNewAccountParameters = JSON.parse(req.body);
  const { password }: CreateNewAccountParameters = JSON.parse(req.body);
  console.log(userName, password)
  checkPassword(password)
    .then(resp => {
      if(resp.result) {
        if (!checkUN(userName)) {
          res.status(400).json({ result: false, errors: 'un&exp' });
        } else {
          res.status(400).json({ result: false, errors: 'exposed' });
        }
      } else {
        if (checkPW(password) && checkUN(userName)) {
          res.status(200).json({ result: true, errors:'' });
        }
        if (!checkPW(password) && !checkUN(userName)) {
          res.status(400).json({ result: false, errors: 'pw&un' });
        }
        if (!checkPW(password)) {
          res.status(400).json({ result: false, errors: 'pw' });
        }

      }
    })
    .catch(resp => {
      console.log('error');
    })


}
