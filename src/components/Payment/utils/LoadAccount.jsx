// import StellarSdk from 'stellar-sdk'

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/')
// const server = new StellarSdk.Server({
//     hostname: 'horizon-testnet.stellar.org',
//     secure: true,
//     port: 443
//   });

// const window = window
const LoadAccount = async publicKey => {
 
    //Cargamos la cuenta a traves del sdk de Stellar
    // const account = await  
    console.log(server)
    const account = server.loadAccount(publicKey)
    // const account = await server.loadAccount(publicKey)
    console.log(account)

    return account

}

export {  LoadAccount }