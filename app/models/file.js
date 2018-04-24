module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('file', {
        file: DataTypes.BLOB,
        status: DataTypes.BOOLEAN,
        mimetype: DataTypes.STRING,
        encoding: DataTypes.STRING,
        name: DataTypes.STRING,
        code: DataTypes.STRING,
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
