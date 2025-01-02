// import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redis = new Redis(process.env.UPSTASH_REDIS_URI);

// redis.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// export default redis;

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_URI) {
    throw new Error("Missing UPSTASH_REDIS_URI in environment variables");
}

const redis = new Redis(process.env.UPSTASH_REDIS_URI, {
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000); // Retry with increasing delay
        console.log(`Retrying Redis connection in ${delay} ms`);
        return delay;
    },
    reconnectOnError(err) {
        console.error('Reconnect on Redis error:', err);
        if (err.message.includes('ECONNRESET')) {
            return true; // Attempt to reconnect
        }
        return false; // Do not reconnect for other errors
    },
    enableReadyCheck: true, // Ensures Redis is ready before proceeding
    keepAlive: 10000, // Keep the connection alive
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

redis.on('close', () => {
    console.warn('Redis connection closed');
});

export default redis;
