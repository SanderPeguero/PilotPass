import React, { useState } from 'react'
// import StellarSdk from 'stellar-sdk'
import Styles from './Login.module.css'
import Chip from '../../../Images/Chip.png'
import Button from '@mui/material/Button';

const Login = ({ setSecret, setPublicKey, setKeyCopied }) => {
  
  //Valor del secret a importar
  const [secretToImport, setSecretToImport] = useState('')

  //Funcion para crear una cuenta
  const createAccount = () => {
        
    const keys = createTestAccount()

   //Guardamos las llaves en la sesion
    localStorage.setItem('secret', keys.secret)
    localStorage.setItem('publicKey', keys.publicKey)
    
    //Actualizamos la vista y pasamos a copy
    setPublicKey(keys.publicKey)
    setSecret(keys.secret)

  }

  // Funcion para importar una cuenta desde el secret
  const importAccount = () => {

      //Todas las secret keys tienen una longitud de 56 caracteres
      if(secretToImport.length === 56){
          
          // const sourceKeys = StellarSdk.Keypair.fromSecret(secretToImport).publicKey()
          const sourceKeys = StellarSdk.Keypair.fromSecret(secretToImport)
          // const sourceKeys = StellarSdk
          
          //Al importar una cuenta, hay que guardar todos los flags en localStorage para mantener la sesion
          localStorage.setItem('secret', secretToImport)
          localStorage.setItem('publicKey', sourceKeys.publicKey())
          localStorage.setItem('keyCopied', true)

          //Con esto actualizamos correctamente la vista
          setPublicKey(sourceKeys.publicKey())
          setSecret(secretToImport)
          setKeyCopied(true)

      }else {
          toast({
              title: 'Error',
              description: 'Asegure que su Secret Key es correcta',
              status: 'error',
              duration: 9000,
              isClosable: true

          })
      }
  }


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
      <div className="card" style={{ height: '22rem', width: '35rem', background: "linear-gradient(90deg, #24d1e8 0%, #009ef3 100%)", padding: "10px" }}>
        <form>
          <h1 className="card__title">Payment Information</h1>
          <div className="card__row" style={{ paddingTop: '1rem'}}>
            <div className="card__col">
              <label htmlFor="cardNumber" className="card__label">
                Secret Wallet Hash
              </label>
              <input
                onChange={({ target: {value}}) => setSecretToImport(value)}
                value={secretToImport}
                type="text"
                className="card__input card__input--large"
                id="cardNumber"
                placeholder="x x x x x x x x x x x x x x x x x x x x x x"
              />
            </div>
            <div className="card__col card__chip">
              <img src={Chip} alt="chip" />
            </div>
          </div>
          <Button variant='contained' onClick={importAccount} style={{
            color: 'black',
            background: 'linear-gradient( to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4) )'
          }}>LogIn</Button>
        </form>
      </div>
    </div>

  )

}

export default Login