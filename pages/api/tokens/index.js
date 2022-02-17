export default async function handler(request, response) {
    let tokens = require("../../../token_list");
    return response.status(200).send(tokens)
}