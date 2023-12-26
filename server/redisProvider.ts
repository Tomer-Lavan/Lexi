import * as redis from 'redis';
import { promisify } from 'util';

class RedisProvider {
    private client: any;

    constructor() {
        // Initialize a Redis client
        this.client = redis.createClient({
            legacyMode: true,
            url: 'redis://localhost:6379', // Replace with your Redis server details
        }
            // Redis server configuration options (e.g., host, port, password)
            // host: 'localhost',
            // port: 6379,
            // Add any other options you need
        );
        this.client.connect().catch(console.error)


        // Promisify the get and set methods
        this.client.getAsync = promisify(this.client.get).bind(this.client);
        this.client.setAsync = promisify(this.client.set).bind(this.client);
    }

    async get(key: string): Promise<string | null> {
        try {
            const result = await this.client.getAsync(key);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async set(key: string, value: any): Promise<void> {
        try {
            await this.client.setAsync(key, value);
        } catch (error) {
            throw error;
        }
    }

    close() {
        if (!this.client.closed) {
            this.client.quit();
        }
    }
}

