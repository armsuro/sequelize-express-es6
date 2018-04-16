import Constants from './config/constants';
import Socket from 'socket.io';
import DB from './database';
import WebsocketRoute from './routes/websocket.route';

/**
 * Class for Websocket extend from socket
 * @class
 */
class Websocket extends Socket {
    /**
     * Constructor conected to socket
     * @param {object} config - The websocket configs.
     * @constructor
     */
    constructor(config) {
        super(config);
        this.on('connection', this.connect.bind(this));
    }

    /**
     * Connect function created socket conection.
     * @param {object} socket - The socket conection.
     * @return {Promise} sso_token object.
    */
    connect(socket) {
        let token = socket.handshake.query['access-token'];
        if (!token) return socket.disconnect();
        return DB.sso_token.findOne({
            'where': {
                'access_token': token,
            },
            'include': [{
                'model': DB.users,
            }],
        }).then((data) => {
            if (!data) return socket.disconnect();
            new WebsocketRoute(socket, data.user);
        }).catch((error) => {
            socket.disconnect();
        });
    }
}

export default new Websocket({
    'path': Constants.WEBSOCKET_PATH,
});
