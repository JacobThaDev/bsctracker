# bsctracker
A nice and easy to use Bsc portfolio tracker that shows reflections, balance, value, and more.

**Features**
- Easy to use with a clean UI
- Track supported token balances, prices, and reflections
- Embeded candlestick charts and token data via Dexscreener
- Transaction history
- Supports any bsc token (far as i can tell, anyway)

Create a `.env.local` file and paste this inside, and make edits accordingly. 

```
NEXT_PUBLIC_API_URL=https://yourwebsite.com/api
NEXT_PUBLIC_BSCKEY=YOURAPIKEY
```

The `BSCKEY` can be acquired from https://bscscan.com/myapikey. It's not that big of a deal if this exposed because it's just reading data from bscscan, it does not have any kind of write functions to edit your account or anything of the such.

---

### API Endpoints:
Note: You'll need to build your own API for this, as mine is not public.

`/tokens`<br>
gets a list of all tokens

`/token/<symbol>`<br>
get a single token

`/token/<symbol>/price`<br>
return the price of a token

`txns/<address>`<br>
get a list of transactions of an address from bscscan. includes all tokens.

`txns/<address>/<symbol>`<br>
get a list of transactions of an address from bscscan by token symbol. 

---

### The database

Below is my sequelize file that creates my table. The table should be updated in the background while the api endpoint just reads from the database. This is to prevent a lot of overhead from calling another API from the endpoint.

```js
module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define("tokens", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        decimals: { // number of decimals for the token
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        holders: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        transfers: { // number of transactions
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        contract: { // token contract address
            type: DataTypes.STRING,
            allowNull: false
        },
        liquidity: { // liquidity pool address
            type: DataTypes.STRING,
            allowNull: false
        },
        burn_wallet: { // burn wallet address
            type: DataTypes.STRING,
            allowNull: false
        },
        last_update: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    return Tokens;
};
```

