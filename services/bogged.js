import Axios from "axios";

const bogged = Axios.create({
    baseURL: "https://api.bogged.finance/v1/",
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default bogged;