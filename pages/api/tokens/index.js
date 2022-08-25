const tokenList = require("../../../tokens");

export default async function handler(request, response) {
    return response.status(200).send({
        items: tokenList
    });
}