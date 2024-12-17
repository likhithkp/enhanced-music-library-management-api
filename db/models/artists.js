module.exports = (sequelize, DataTypes) => {
    const Artists = sequelize.define('artists', {
        artist_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        grammy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Artists.prototype.setAssociation = (models) => {
        Artists.hasMany(models.Albums, { foreignKey: 'artist_id' });
        Artists.hasMany(models.Tracks, { foreignKey: 'artist_id' });
    };

    return Artists;
};