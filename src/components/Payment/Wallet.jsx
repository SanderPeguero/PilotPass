import React, { useState } from 'react'
import Login from './Login/Login.jsx'
// import CreateWallet from './StartWallet/Create'
import CopyWallet from './StartWallet/Copy.jsx'
import Data from './Data/Data.jsx'
// import { useLocalStorage } from '../../Hooks/useLocalStorage'

const Wallet = () => {

   //Valores de las llaves
   const [secret, setSecret] = useState(localStorage.secret)
//    const [secret, setSecret] = useLocalStorage('secret', '')
   const [publicKey, setPublicKey] = useState(localStorage.publicKey)
//    const [publicKey, setPublicKey] = useLocalStorage('publicKey', '')

   //Bandera para checar si ya copiaron la llave privada
   const [isKeyCopied, setKeyCopied] = useState(localStorage.keyCopied)
//    const [isKeyCopied, setKeyCopied] = useLocalStorage('keyCopied', '')

   //Funcion para salir de la cuenta del
   const resetAccount = () => {

       //Al salir de la cuenta, removemos todos los datos de sesion
       localStorage.removeItem("keyCopied")
       localStorage.removeItem("publicKey")
       localStorage.removeItem("secret")

       

       //Con esto mandamos al usuario a la vista de inicio
       setKeyCopied(undefined)
       setSecret(undefined)
       setPublicKey(undefined)
   }

   //Al recien iniciar la aplicacion, es necesario pedir que cree una cuenta
   if(!secret || !publicKey) {

       //En la vista de inicio, vamos a necesitar acceso a los setters
       //para avanzar a las siguientes vistas
       return(
           <Login
               setSecret={setSecret}
               setPublicKey={setPublicKey}
               setKeyCopied={setKeyCopied}
           />
       )
       //Una vez creada hay que pedirle que guarde su llave privada para que pueda entrar en el futuro

   }else if(!isKeyCopied){

       //En la vista de copy necesitamos el Secret para mostrarlo al usuario,
       //ademas, utilizaremos la llave publica para fondear la cuenta.
       //El setter sera para avanzar a la siguiente vista
       //y el reset para regresar al inicio

       return(
           <CopyWallet
               secret={secret}
               publicKey={publicKey}
               setKeyCopied={setKeyCopied}
               resetAccount={resetAccount}
           />
       )

   }else{
       
       //Si ya tiene sus llaves, y ya copio el secret, iniciamos el wallet
       return (
         <Data
             secret={secret}
             publicKey={publicKey}
             resetAccount={resetAccount}
         />
       )
   }

}

export default Wallet