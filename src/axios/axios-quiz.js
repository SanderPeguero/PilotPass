import axios from 'axios'

export default axios.create({
    baseURL: "https://quiz-by-sander-default-rtdb.firebaseio.com"
})