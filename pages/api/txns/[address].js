import axios from 'axios';
import * as Functions from '../../../functions';

export default async function handler(request, response) {
    let address = request.query.address;

    let txndata = await axios.get("https://api.bscscan.com/api", {
        params: {
            module: 'account',
            action: 'tokentx',
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: 'desc',
            apikey: process.env.bscscan_key
        }
    });

    if (txndata.data.error) {
        return response.status(500).json({
            error: txndata.data.error
        });
    }
    
    return response.status(200).json(txndata.data.result);
};