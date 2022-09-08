import Axios from "axios";

const bscscan = Axios.create({
    baseURL: "https://api.bscscan.com/api",
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default bscscan;