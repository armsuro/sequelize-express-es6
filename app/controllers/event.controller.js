import BaseController from './base.controller';
import ResponseService from '../services/response.service';
import SportService from '../services/sport.service';
import RedisService from '../services/redis.service';

/**
 * EventController class
 * @class
 * @return {json} methods
 */

class EventController extends BaseController {
    /**
     * Get function call one event data.
     * @param {string} room - Socket room.
     * @param {Object} value - Redis value.
     * @return {object} data - data
     */
    get = async(room, {
        id,
    }) => {
        const eventData = await SportService.getById(id);
        room.emit('eventData', ResponseService.generate('success', eventData));
    }
    /**
     * update function updated event data.
     * @param {string} room - Socket room.
     * @param {object} data - updated param.
     * @return {object} data - data
     */
    update = async(room, data) => {
        if (data.id && data.value) {
            await RedisService.update(data.id, data.value);
            return room.emit('updateEvent', ResponseService.generate('success', data));
        } else {
            return room.emit('updateEvent', ResponseService.generate('bad_request'));
        }
    }
}

export default new EventController();
