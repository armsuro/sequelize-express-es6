module.exports = (sequelize, DataTypes) => {
    const event = sequelize.define('event', {
        sport_id: DataTypes.INTEGER,
        league_id: DataTypes.INTEGER,
        team_1_id: DataTypes.INTEGER,
        team_2_id: DataTypes.INTEGER,
        country_code: DataTypes.STRING,
        stadium: DataTypes.STRING,
        coordinates: DataTypes.STRING,
        event_data: DataTypes.JSON,
        status_id: DataTypes.INTEGER,
        created_user_id: DataTypes.INTEGER,
        organization_id: DataTypes.INTEGER,
        score_board_id: DataTypes.INTEGER,
        weather: DataTypes.STRING,
        teams_colors: DataTypes.JSON,
    }, {
        timestamps: false,
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return event;
};
