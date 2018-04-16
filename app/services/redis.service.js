import redis from 'redis';
import bluebird from 'bluebird';
import ResponseService from './response.service';
import Constants from '../config/constants';
import SyncService from './sync.service';

/**
 * Redis class to working with redis.
 * @class
 */

class Redis {
    /**
     * Constructor conected with Redis client
     * @constructor
     */
    constructor() {
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);
        this.client = redis.createClient();

        const sub = this.client.duplicate();

        sub.psubscribe('__keyspace@0__:*:ttl');
        sub.on('pmessage', this.listen.bind(this), (err, data) => {
            console.log(err, data);
        });

        this.client.on('error', (err) => {
            ResponseService.generate('server_error', err);
        });
    }

    /**
     * set function save data to redis
     * @param {string} key - Redis key.
     * @param {Object} value - Redis value.
     * @return {Object} data.
     */
    set(key, value) {
            return this.client.setAsync(key, JSON.stringify(value))
                .then(() => this.client.ttlAsync(`${key}:ttl`))
                .then((ttl) => {
                    if (ttl > 0) return true;
                    return this.client.setexAsync(
                        `${key}:ttl`,
                        Constants.default_cache_ttl,
                        0,
                    );
                });
        }
    /**
     * update function updated redis event data
     * @param {string} key - Redis key.
     * @param {Object} value - Redis value.
     * @return {Object} data.
     */
    async update(key, value) {
        try {
            const redisData = await this.get(key);
            return this.set(key, Object.assign(redisData, value));
        } catch (error) {
            return ResponseService.generate('server_error', error);
        }
    }
    /**
     * get function get data to redis
     * @param {string} key - Redis key.
     * @return {Object} data.
     */
    async get(key) {
        const event = await this.client.getAsync(key);
        return JSON.parse(event);
    }

    /**
     * listen function handle TTL timeout
     * @param {string} pattern
     * @param {string} channel
     * @param {string} message
     * @return {Object} data.
     */
    async listen(pattern, channel, message) {
        try {
            if (message !== 'expired') return;
            const target = channel.replace('__keyspace@0__:', '').replace(':ttl', '');
            return await SyncService.redisDataToSql(target);
        } catch (error) {
            return ResponseService.generate('server_error', error);
        }
    }
}

export default new Redis();
