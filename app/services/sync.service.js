import RedisService from '../services/redis.service';
import DB from '../database';

/**
 * Sync class to working with redis and store data to sql.
 * @class
 */

class Sync {
    /**
     * redisDataToSql function get data to redis by id
     * @param {integer} id - Event id.
     * @return {Object} data.
     */
    async redisDataToSql(id) {
        const eventData = await RedisService.get(id);
        return DB.event.update({ 'event_data': eventData }, {
            'where': {
                id,
            },
        });
    }
}

export default new Sync();
