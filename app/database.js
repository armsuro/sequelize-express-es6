import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import Constants from './config/constants';

/**
 * Database class
 * @class
 * @return {json} Sequelize models
*/

class Database {
	/**
     * function constructor
     * @constructor
     */
    constructor() {
        this.db = {};
        this.sequelize = new Sequelize(Constants.mysql.uri, {});
    }

    /**
     * Function Create find all models and created db
     * @return {json} db
    */
    create() {
        fs
            .readdirSync(`${__dirname}/models`)
            .forEach((file) => {
                const model = this.sequelize.import(path.join(__dirname, '/models', file));
                this.db[model.name] = model;
            });
        Object.keys(this.db).forEach((modelName) => {
            if ('associate' in this.db[modelName]) {
                this.db[modelName].associate(this.db);
            }
        });
        this.db.sequelize = this.sequelize;
        this.db.Sequelize = Sequelize;
        return this.db;
    }
}

export default new Database().create();
