"use strict";

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface
            .createTable('change_log', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                file_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'file',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
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
            });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('change_log');
    }
};




