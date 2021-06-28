import Head from 'next/head';
import { setUncaughtExceptionCaptureCallback } from 'node:process';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [unError, setUNError] = useState('')
  const [pwError, setPWError] = useState('')

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
    });
    const result = await response.json()
    setStatus(result.errors);
    handleError(result.errors)
  }

  const handleError = (error: string) => {
    if (error ===  'pw&un' || error === 'un' || error === 'un&exp') {
      setUNError('Invalid username. Username must be at least 10 characters long.');
    }
    if (error === 'pw&un' || error === 'pw') {
      setPWError('Invalid password. Password must be at least 20 characters and contain at least 1 letter, 1 number, and 1 symbol (!@#$%).');
    }
    if (status ===  'exposed' || status === 'un&exp') {
      setPWError('Your password has been exposed, please set a new one.')
    }
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
          </label >
          {unError.length ?
            <p className={styles.alert}>{unError}</p>
            : <div className={styles.spaceSaver}></div>
          }
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
            {pwError.length ?
              <p className={styles.alert}>{pwError}</p>
              : <div className={styles.spaceSaver}></div>
            }
          <button id={styles.submit} type="submit">Create Account</button>
        </form>
      </article>
    </>
  );
}
