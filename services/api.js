import Axios from "axios";

const api = Axios.create({
    baseURL: "https://api.dexscreener.com/latest/dex/",
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;