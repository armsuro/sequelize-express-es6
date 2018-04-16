module.exports = (sequelize, DataTypes) => {
    const sportTemplate = sequelize.define('sports_templates', {
        sport_id: DataTypes.INTEGER,
        data: DataTypes.JSON,
    }, {
        timestamps: false,
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return sportTemplate;
};
