module.exports = (sequelize, DataTypes) => {
    const ssoToken = sequelize.define('sso_token', {
        user_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        id_token: DataTypes.TEXT,
        sid: DataTypes.STRING,
        access_token: DataTypes.STRING,
        token_type: DataTypes.STRING,
        expires_at: DataTypes.STRING,
        scope: DataTypes.STRING,
        state: DataTypes.STRING,
        session_state: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
    }, {
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            associate: (models) => {
                ssoToken.belongsTo(models.users, {
                    foreignKey: 'user_id',
                });
            },
        },
    });
    return ssoToken;
};
