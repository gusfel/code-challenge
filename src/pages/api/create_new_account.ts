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

const checkUN = (str: string) => {
  let validUN = new RegExp("^(?=.*[a-zA-z])(?=.{10,50}$)")
  return validUN.test(str);
}

const checkPW = (str: string) => {
  let validPW = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#\$%])(?=.{20,50}$)")
  return validPW.test(str);
}

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { userName }: CreateNewAccountParameters = JSON.parse(req.body);
  const { password }: CreateNewAccountParameters = JSON.parse(req.body);
  const testResults = await checkPassword(password)
    .then(resp => {
      if(resp.result) {
        if (!checkUN(userName)) {
          return { result: false, errors: 'un&exp' };
        } else {
          return { result: false, errors: 'exposed' };
        }
      } else {
        if (checkPW(password) && checkUN(userName)) {
          return { result: true, errors: '' };
        }
        if (!checkPW(password) && !checkUN(userName)) {
          return { result: false, errors: 'pw&un' };
        }
        if (!checkUN(userName)) {
          return { result: false, errors: 'un' };
        }
        if (!checkPW(password)) {
          return { result: false, errors: 'pw' };
        }
      }
    })
    .catch(resp => {
      res.status(500)
    })
  res.status(200).json(testResults)
}


// checkPassword(password)
// .then(resp => {
//   if(resp.result) {
//     if (!checkUN(userName)) {
//       res.status(200).json({ result: false, errors: 'un&exp' });
//     } else {
//       res.status(200).json({ result: false, errors: 'exposed' });
//     }
//   } else {
//     if (checkPW(password) && checkUN(userName)) {
//       res.status(200).json({ result: true, errors: '' });
//     }
//     if (!checkPW(password) && !checkUN(userName)) {
//       res.status(200).json({ result: false, errors: 'pw&un' });
//     }
//     if (!checkUN(userName)) {
//       res.status(200).json({ result: false, errors: 'un' });
//     }
//     if (!checkPW(password)) {
//       res.status(200).json({ result: false, errors: 'pw' });
//     }
//   }
// })
// .catch(resp => {
//   res.status(500)
// })