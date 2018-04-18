import FileSystem from 'fs';
import Crypto from 'crypto';

class Crypt {

    constructor(filePath, iv) {
        this.filePath = filePath;
        this.password = Crypto.createHash('sha256').update('SurenGasparyanPass').digest();
        this.iv = iv;
    }

    encryptAsync() {
        const readStream = FileSystem.readFileSync(this.filePath);
        const encipher = Crypto.createCipheriv('aes-256-cbc', this.password, this.iv);
        return Buffer.concat([
            encipher.update(new Buffer(readStream)),
            encipher.final()
        ]);

    }

    decryptAsync(data) {
        const decipher = Crypto.createDecipheriv('aes-256-cbc', this.password, this.iv);
        return Buffer.concat([
            decipher.update(data),
            decipher.final()
        ]).toString('utf8')
    }
}

export default Crypt;