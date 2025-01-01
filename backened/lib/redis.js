import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URI);

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

export default redis;