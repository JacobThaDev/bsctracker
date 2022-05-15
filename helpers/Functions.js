
class Functions {

     /**
     * 
     * @param {String} hash 
     * @returns short version of a txn hash
     */
    static shortenHash(hash) {
        return hash.substring(0, 10);
    }

    static shortenAddress(address) {
        return address.substring(0, 2)+"..."+address.substring(address.length - 4, address.length)
    }
    /**
     * 
     * @param {Integer} number 
     * @returns number with commans and decimals
     */
    static formatNumber(number, digits) {
        number = parseFloat(number);
        return number.toLocaleString(undefined, { 
            minimumFractionDigits: digits
        });
    }

    /**
     * Shortens a price down by replacing leading 0's with an exponent
     * ie. 0.00000004 becomes 0.0(7)4
     * @param {Float} price 
     * @returns price as a subscript string
     */
    static shortenPrice(price) {
        price = this.formatNumber(price, 12);

        let split  = price.split("0.0");
        let digits = 0;

        for (let i = 0; i < split[1].length; i++) {
            if (split[1].charAt(i) != "0") {
                digits = i;
                break;
            }
        }

        let substr = split[1].substr(digits, split[1].length);
        return (<>$0.0<sub className="priceSub">{digits+1}</sub>{substr}</>);
    }

    /**
     * 
     * @param {Integer} min 
     * @param {Integer} max 
     * @returns random number between min and max. 
     */
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static getRelTime(date) {
        let start   = new Date().getTime();
        let end     = new Date(date).getTime();
        let diff    = start - end;
        let elapsed = this.getElapsed(diff);
    
        let string;
    
        if (elapsed.year > 0) {
            string = elapsed.year+" year"+(elapsed.year > 1 ? "s" : "");
            if (elapsed.month > 0) {
                string += " "+elapsed.month+" month"+(elapsed.month > 1 ? "s" : "")
            }
            return string+" ago";
        }
    
        if (elapsed.month > 0) {
            string = elapsed.month+" month"+(elapsed.month > 1 ? "s" : "");
            if (elapsed.day > 0) {
                string += " "+elapsed.day+" day"+(elapsed.day > 1 ? "s" : "")
            }
            return string+" ago";
        }
    
        if (elapsed.day > 0) {
            string = elapsed.day+" day"+(elapsed.day > 1 ? "s" : "");
            if (elapsed.hour > 0) {
                string += " "+elapsed.hour+" hour"+(elapsed.hour > 1 ? "s" : "")
            }
            return string+" ago";
        }
    
        if (elapsed.hour > 0) {
            string = elapsed.hour+" hour"+(elapsed.hour > 1 ? "s" : "");
            if (elapsed.minute > 0) {
                string += " "+elapsed.minute+" minute"+(elapsed.minute > 1 ? "s" : "")
            }
            return string+" ago";
        }
    
        if (elapsed.minute >= 5) {
            string = elapsed.minute+" minute"+(elapsed.minute > 1 ? "s" : "");
            return string+" ago";
        }
    
        if (elapsed.minute > 0) {
            return "a few minutes ago";
        }
    
        if (elapsed.second >= 15) {
            return "a few seconds ago";
        }
    
        return "just now";
    }
    
    static getElapsed(t) {
        let year;
        let month;
        let day;
        let hour;
        let minute;
        let second;
      
        second  = Math.floor(t / 1000);
        minute  = Math.floor(second / 60);
        second  = second % 60;
        hour    = Math.floor(minute / 60);
        minute  = minute % 60;
        day     = Math.floor(hour / 24);
        hour    = hour % 24;
        month   = Math.floor(day / 30);
        day     = day % 30;
        year    = Math.floor(month / 12);
        month   = month % 12;
      
        return { 
            year, 
            month,
            day, 
            hour, 
            minute, 
            second 
        };
    }

    static shortenNumber = (number, decimals = 3) => {
        let divideBy = this.getDivideBy(number);
        let suffix   = this.getSuffix(number);
        return this.formatNumber(parseFloat((number / divideBy).toFixed(decimals)), decimals) + suffix;
    }
    
    static getDivideBy = (number) => {
        if (number <= 100_000) {
            return 1;
        } else if (number <= 1_000_000) {
            return 1_000;
        } else if (number <= 1_000_000_000) {
            return 1_000_000;
        } else if (number <= 1_000_000_000_000) {
            return 1_000_000_000;
        } else if (number <= 1_000_000_000_000_000) {
            return 1_000_000_000_000;
        }
    }
    
    static getSuffix = (number) => {
        if (number < 100_000) {
            return "";
        } else if (number < 1_000_000) {
            return "K";
        } else if (number <= 1_000_000_000) {
            return "M";
        } else if (number <= 1_000_000_000_000) {
            return "B";
        } else if (number <= 1_000_000_000_000_000) {
            return "TR";
        } else if (number <= 1_000_000_000_000_000_000) {
            return "QD";
        }
    }

    static getDateStr = (timestamp) => {
        let date  = new Date(timestamp);
    
        let months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'Julu', 'August', 'September', 'October', 'November', 'December'
        ];
        
        let month  = date.getMonth();
        let day    = date.getDate();
        let hour   = date.getHours();
        let mins   = date.getMinutes();
    
        if (hour < 10)
            hour = "0"+hour;
        if (mins < 10)
            mins = "0"+mins;
    
        return months[month]+" "+day+", "+date.getFullYear();
    }

}

module.exports = Functions;