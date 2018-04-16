import DB from '../database';
import Redis from './redis.service';
import RedisService from '../services/redis.service';

/**
 * Sport class to working with sport data.
 * @class
 */

class Sport {
    /**
     * getById function get individual event data
     * @param {integer} id - Event id.
     * @return {Object} data.
     */
    async getById(id) {
        const event = await DB.event.findById(id);
        const sportData = await DB.sports_templates.findOne({
                'where': {
                    'sport_id': event.sport_id,
                },
                'raw': true,
            });
        const redisData = await Redis.get(id);
        const data = Object.assign({}, JSON.parse(sportData.data), JSON.parse(event.event_data), redisData);
        await RedisService.set(event.id, data);
        return data;
    }
}

export default new Sport();
