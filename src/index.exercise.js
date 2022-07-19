import React, { useState } from 'react'
import {createRoot} from 'react-dom/client'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import {Logo} from './components/logo'

function App() {
  const [openModal, setOpenModal] = useState('none')

  return (
    <>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Login</h3>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Register</h3>
      </Dialog>
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
