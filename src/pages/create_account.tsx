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
      body: JSON.stringify({ userName, password }),
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <img id={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Wealthfront_Logo.svg/1200px-Wealthfront_Logo.svg.png"></img>
          <h2 id={styles.h2}>Create New Account</h2>
          <label>
            <span className={styles.inputName}>Username:</span>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            <span className={styles.inputName}>Password:</span>
            <input
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          <input id={styles.submit} type="submit" value="Create Account" />
          {status.length ?
            <div>false</div>
            :
            <></>
          }
        </form>
      </article>
    </>
  );
}
