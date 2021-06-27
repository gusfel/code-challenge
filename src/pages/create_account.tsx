import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({userName, password}),
    });


    const result = await response.json()
    setStatus(result.errors);
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        Create New Account
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            </label>
            <label>
              Password:
            <input
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            </label>
            <input type="submit" value="Create Account" />
        </form>
        {status.length ?
          <div>false</div>
          :
          <></>
        }
      </article>
    </>
  );
}
