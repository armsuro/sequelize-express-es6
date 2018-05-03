"use strict";

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface
            .createTable('file', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                file: {
                    type: Sequelize.BLOB,
                    allowNull: true
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                },
                mimetype: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                encoding: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                code: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('file');
    }
};




