import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        userName: 'testtest1234',
        password: '1!abcdefghijklmnopqrst'
    },
    });

    const test = await createNewAccount(req, res);
    console.log(test)
    console.log(res._getJSONData())
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
      errors: ''
    });
  });
});
// const { req, res } = mockRequest({
//   method: 'POST',
//   body: {
//     userName: 'testtest1234',
//     password: '1!abcdefghijklmnopqrst'
// },
// });

// await createNewAccount(req, res);
// console.log(res._getJSONData())
// expect(res._getStatusCode()).toBe(200);
// expect(res._getJSONData()).toEqual({
//   result: true,
//   errors: ''
// });
// });