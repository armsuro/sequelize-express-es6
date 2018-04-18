import BaseController from './base.controller';
import ResponseService from '../services/response.service';
import CryptService from '../services/crypt.service';
import Busboy from 'busboy';

/**
 * FileController class
 * @class
 * @return {json} methods
 */

class FileController extends BaseController {
    /**
     * Download function download function to .
     * @param {req} request - Request method.
     * @param {res} response - Response Method.
     * @return {object} data - data
     */
    download = async(req, res) => {
        // const crypt = new CryptService("test", new Buffer('a2xhcgAAAAAAAAAA'));
        // console.log(safe.decryptAsync(req.b));
    }
    /**
     * upload function upload and ecript file.
     * @param {req} request - Request method.
     * @param {res} response - Response Method.
     * @return {object} data - data
     */
    upload = async(req, res) => {
   
    }
}

export default new FileController();
