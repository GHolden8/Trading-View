# CS480 Final Project

### A Note on the Schema:
___

I can explain this in-depth at a later date but something that happens in financial datasets is if we don't specify the period of a candle, or the 'granularity' our queries will have spurious tuples without an attribute
specifying this.

For example, if we stored all data in one table we would have to deal with this:

Suppose we wanted one query to return all candles from 5 minutes. We would have to
make some very interesting queries:

Ex:

lets get all candles for 5 minutes with the following example:

Example data:

    (ticker,timestamp,open,high,low,close,volume)

    'TSLA','01-01-24 16:50:00',120.00,130.00,115.00,119.00,123000    
    'TSLA','01-01-24 17:70:00',100.00,160.00,96.00,120.00,1003000

Notice how we cannot discern programmatically or schematically what granularity the candles are, one could be a 5m candle and the other a 24h candle.

Most smaller time intervals are congruant to larger time intervals in seconds:

24h % 5m = 86400 % 300 = 0
Thus 5m ≅ 24h

so use of the primary key of the timestamp must also be called into question as there _will_ exist a candle of a period which is congruant to another period, which will result in a uniqueness constraint violation.

We can solve this by adding a field 'granularity' which is of enum type.

Enums are a datatype analogous to a immutable tuple of pre-determined values.

Ex:
    ENUM("5m", "10m", "30m", "1h", ... "24h")

The addition of this field would allow us to filter by granularity, like so:

    SELECT * 
    FROM ticker_dataset
    WHERE ticker="tsla" AND granularity="5m"
    ;

Then, the query would verifiably return all candles from TSLA of candles which are exclusively 5m.