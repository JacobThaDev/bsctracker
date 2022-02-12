# bsctracker
A nice and easy to use Bsc portfolio tracker that shows reflections, balance, value, and more.

**Features**
- Easy to use with a clean UI
- Track supported token balances, prices, and reflections
- Embded candlestick charts and token data via Dexscreener
- Transaction history
- Supports any bsc token (far as i can tell, anyway)

Note: You'll need to build your own API for this, as mine is not public.

Create a `.env.local` file and paste this inside, and make edits accordingly. 

```
NEXT_PUBLIC_API_URL=https://yourwebsite.com/api
NEXT_PUBLIC_BSCKEY=YOURAPIKEY
```

The `BSCKEY` can be acquired from https://bscscan.com/myapikey. It's not that big of a deal if this exposed because it's just reading data from bscscan, it does not have any kind of write functions to edit your account or anything of the such.

---

API Endpoints:

`/tokens`<br>
gets a list of all tokens

`/token/<symbol>`<br>
get a single token

`/token/<symbol>/price`<br>
return the price of a token

`txns/<address>`<br>
get a list of transactions of an address from bscscan. includes all tokens

`txns/<address>/<symbol>`<br>
get a list of transactions of an address from bscscan by token symbol. 

---

***The database***
```sql
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `decimals` int(11) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `volume_24h` bigint(20) NOT NULL DEFAULT '0',
  `rewards` varchar(255) NOT NULL,
  `supply` bigint(20) NOT NULL DEFAULT '0',
  `burned` bigint(20) NOT NULL DEFAULT '0',
  `contract` varchar(255) NOT NULL,
  `holders` int(11) NOT NULL DEFAULT '0',
  `days_open` int(11) NOT NULL DEFAULT '0',
  `transfers` int(11) NOT NULL DEFAULT '0',
  `liquidity` varchar(255) NOT NULL,
  `burn_wallet` varchar(255) DEFAULT NULL,
  `last_update` bigint(20) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);
  
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
```

