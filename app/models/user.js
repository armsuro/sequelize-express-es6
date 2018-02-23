module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define("user", {
        first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		full_name: DataTypes.STRING,
		company_name: DataTypes.STRING,
		image: DataTypes.STRING,
		email: DataTypes.STRING,
		domain: DataTypes.STRING,
		phone: DataTypes.STRING,
		address: DataTypes.STRING,
		time_zone: DataTypes.STRING,
		sport_id: DataTypes.INTEGER,
		country_code: DataTypes.STRING,
		active: DataTypes.BOOLEAN,
		role_id: DataTypes.INTEGER,
		password: DataTypes.STRING,
		added_user_id: DataTypes.INTEGER
    }, {
  		timestamps: false,
        classMethods: {
            associate: models => {
            }
        }
    });

    return user;
};