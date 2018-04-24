module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('change_log', {
        file_id: DataTypes.INTEGER,
    }, {
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return file;
};
