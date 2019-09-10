import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-b8136.firebaseio.com/'
})


export default instance;