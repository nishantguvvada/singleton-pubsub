import { createClient, RedisClientType } from "redis";

export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[]>;
    
    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance
    }

    public userSubscribe(userId: string, stockTicker: string) {
        if (!this.subscriptions.has(stockTicker)) {
            this.subscriptions.set(stockTicker, []); // every stock has an array of users subscribed to it
        }
        this.subscriptions.get(stockTicker)?.push(userId);

        if (this.subscriptions.get(stockTicker)?.length === 1) { // once the first user is subscribed to a particular stock
            this.redisClient.subscribe(stockTicker, (message) => { // redis client subscribes to the stock
                this.handleMessage(stockTicker, message);
            });
            console.log(`Subscribed to Redis channel: ${stockTicker}`)
        }

    }

    public userUnsubscribe(userId: string, stockTicker: string) {
        this.subscriptions.set(stockTicker, this.subscriptions.get(stockTicker)?.filter((sub) => sub !== userId) || [])// filter out the userId from the subscription array of the stock

        if (this.subscriptions.get(stockTicker)?.length === 0) { // no user subscribes to the stock
            this.redisClient.unsubscribe(stockTicker);
            console.log(`Unsubscribed to Redis channel: ${stockTicker}`)
        }
    }

    private handleMessage(stockTicker: string, message: string) {
        console.log(`Message received on channel ${stockTicker}: ${message}`);
        this.subscriptions.get(stockTicker)?.forEach((sub) => { // send message to each user subscribed to the stock
            console.log(`Sending message to user: ${sub}`);
        });
    }

    public async disconnect() {
        await this.redisClient.quit();
    }
}