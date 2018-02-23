"use strict";

import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('mysql://root:123456@localhost/live_video_streaming', {});

var db = {};
console.log(`${__dirname}/models`);
fs
    .readdirSync(`${__dirname}/models`)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(file=> {
        const model = sequelize.import(path.join(__dirname, "/models", file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;