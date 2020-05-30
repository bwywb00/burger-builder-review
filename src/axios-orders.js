import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-review.firebaseio.com/'
});

export default instance;
