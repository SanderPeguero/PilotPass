import axios from 'axios'

export default axios.create({
    baseURL: "https://aerolatina-dom-default-rtdb.firebaseio.com/"
})