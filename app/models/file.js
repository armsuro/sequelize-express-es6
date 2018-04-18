module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('file', {
        file: DataTypes.TEXT,
        changed: DataTypes.BOOLEAN,
    }, {
        timestamps: false,
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return event;
};
