module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        image: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        time_zone: DataTypes.STRING,
        country_code: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        role_id: DataTypes.INTEGER,
        added_user_id: DataTypes.INTEGER,
        default_activity_countries: DataTypes.JSON,
        organization_id: DataTypes.INTEGER,
        streams_count: DataTypes.INTEGER,
    }, {
        timestamps: false,
        paranoid: true,
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return users;
};
