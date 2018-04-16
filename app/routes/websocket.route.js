import socket from '../socket';
import EventController from '../controllers/event.controller';

/**
 * Routs for websocket
 * @class
 */
class WebsocketRout {
	constructor(conection, user) {
		conection.join(`organization:${user.organization_id}`);
        const room = socket.sockets.in(`organization:${user.organization_id}`);
		conection.on('getEvent', (data)=>{
			EventController.get(room, data);
		});
		conection.on('updateEvent', (data)=>{
			EventController.update(room, data);
		});
	}
}

export default WebsocketRout;
