import React, { useState, useEffect } from 'react'
import { LoadAccount } from '../utils/LoadAccount.jsx'
import Styles from './Data.module.css'
import Chip from '../../../Images/Chip.png'
import Button from '@mui/material/Button';

const Data = ({ publicKey, secret, resetAccount }) => {
   
  //Estado de la aplicacion con cuenta
   const [account, setAccount] = useState(undefined)

   //Funcion para actualizar la wallet
   const updateAccount = () => {

       const getData = async () => {

           const account = await LoadAccount(publicKey);
           setAccount(account)
           
       }

       getData()
   }

   //Use Effect se ejecuta solo cuando abre la vista principal
   //Por lo que se usara para cargar la cuenta al inicio
   useEffect(updateAccount, [publicKey])

  return (
    <div className={Styles.background} style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      // backgroundSize: '400% 400%',
	    // animation: 'gradient 10s ease infinite',
      overflow: 'hidden'
    }}>
      <div className="card" style={{ height: '22rem', width: '35rem' }}>
        <form>
          {account?.balances.map(({ balance, asset_type}, index) => (
            <div key={Math.random()}>
              <h1 className="card__title" style={{ color: 'white' }}>{balance}</h1>
              
            </div>
          ))}
          <div className="card__row" style={{ paddingTop: '1rem'}}>
            <div className="card__col">
              <label htmlFor="cardNumber" className="card__label">
                Public Wallet Hash
              </label>
              <input
                readOnly
                value={publicKey}
                type="text"
                className="card__input card__input--large"
                style={{ borderBottom: 'none', marginTop: '0.5rem'}}
                id="cardNumber"
                // placeholder="xxxxxxxxxxxxxxxx"
              />
            </div>
            <div className="card__col card__chip">
              <img src={Chip} alt="chip" />
            </div>
          </div>
          <Button variant='contained' onClick={resetAccount} style={{
            color: 'black',
            background: 'linear-gradient( to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4) )'
          }}>Cerrar Cuenta</Button>
        </form>
      </div>
    </div>
  )

}

export default Data