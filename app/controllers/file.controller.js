import BaseController from './base.controller';
import ResponseService from '../services/response.service';
import Crypt from '../services/crypt.service';
import Crypto from 'crypto';
import DB from '../database';

/**
 * FileController class
 * @class
 * @return {json} methods
 */

class FileController extends BaseController {
    /**
     * upload function upload and ecript file.
     * @param {req} request - Request method.
     * @param {res} response - Response Method.
     * @return {object} data - data
     */
    upload = async(req, res) => {
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, name, encoding, mimetype) => {
            let buffer = '';
            file.setEncoding('base64');
            file.on('data', (data) => {
                buffer += data;
            }).on('end', () => {
                const crypt = new Crypt("Password1234", new Buffer('a2xhcgAAAAAAAAAA'));
                const data = {
                    'code': "file_" + Number(new Date()),
                    name,
                    encoding,
                    mimetype,
                    'status': true,
                    "file": crypt.encryptAsync(buffer)
                }
                DB.file.create(data).then(() => {
                    res.json({
                        "url": `localhost:4567/download/${data.code}`
                    })
                }).catch((err) => {
                    console.log(err)
                    return res.status(500).json(err)
                })
            });
        });
    }

    /**
     * Download function download function to .
     * @param {req} request - Request method.
     * @param {res} response - Response Method.
     * @return {object} data - data
     */
    download = async(req, res) => {
        const crypt = new Crypt("Password1234", new Buffer('a2xhcgAAAAAAAAAA'));
        DB.file.findOne({
            'where': {
                'code': req.params.code
            }
        }).then(item => {
            console.log(item.status)
            if(!item.status) return res.send("Your file changed");

            const buffer = crypt.decryptAsync(item.file)
            res.writeHead(200, {
                'Content-Type': item.mimetype,
                'Content-Disposition': `attachment; filename=${item.name}`
            });

            const download = Buffer.from(buffer.toString('utf-8'), 'base64');

            res.end(download);
        }).catch(err=>{
            return res.status(500).json(err)
        })
    }
}

export default new FileController();